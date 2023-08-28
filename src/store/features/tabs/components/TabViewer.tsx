import Box from "@/components/Box";
import React, { FC, useEffect, useMemo, useState } from "react";
import { TabAdd } from "./TabAdd";
import { ContractSelector } from "../../contracts/components/ContractSelector";
import { useContractsList } from "../../contracts/hooks/useContractsList";
import { useAppSelector } from "@/store/hooks";
import { MetadataSources, getMetadataFromAddress } from "@ethereum-sourcify/contract-call-decoder";
import { useChainId, usePublicClient, useWalletClient } from "wagmi";
import { EthereumProvider } from "ethereum-provider";
import { Divider, Grid } from "@mui/material";
import { TabSettings } from "./TabSettings";
import { TabInfoBlock } from "./TabInfoBlock";
import { TabModeSwitcher } from "./TabModeSwitcher";
import { TabSwitcherMode } from "../types";
import { ContractItem } from "../../contracts/contractsSlice";
import { TabMethod } from "./TabMethod";
import { AbiFunction } from "abitype";
import { Tab, setTabContractAddress } from "../tabsSlice";

export type TabViewerProps = {
    tabId: string | undefined | number;
}

export const TabViewer: FC<TabViewerProps> = (props: TabViewerProps) => {

    // tab updater

    const { findContract } = useContractsList({});
    const allTabs = useAppSelector(state => state.tabsSlice.tabs);

    const [tabInfo, setTabInfo] = useState<Tab | undefined>(undefined);

    const client = usePublicClient();
    const { data: wallet } = useWalletClient();
    const userChainId = useChainId();

    const [mode, setMode] = useState<TabSwitcherMode>("read");

    const [contractAddress, setContractAddress] = useState<string | undefined>(undefined);
    const [contract, setContract] = useState<ContractItem | undefined>(undefined);

    const filteredMethods = useMemo(() => {
        if (undefined === contract) return [];
        if ('' === contract.abi || !contractAddress) return [];

        if (mode === "read") {
            return contract.abi.filter((method: { stateMutability: string; }) => method.stateMutability === "view" || method.stateMutability === "pure") ?? [];
        } else if (mode === "write") {
            return contract.abi.filter((method: { stateMutability: string; type: string; }) => method.stateMutability === "nonpayable" || method.stateMutability === "payable")
                .filter((method: { type: string; }) => method.type === "function") ?? [];
        }  // todo implement proxy support
    }, [contract, mode, contractAddress]);

    useEffect(() => {
        if (undefined === props.tabId || 'new' === props.tabId) return;

        const tab = allTabs.filter((tab) => tab.id === props.tabId);
        if (tab.length > 0) {
            setTabInfo(tab[0]);
            setContractAddress(tab[0].contractAddress);
        } else {
            console.log('flush')
            setTabInfo(undefined);
            setContractAddress(undefined);
        }
    }, [props.tabId, allTabs]);

    useEffect(() => {

        if (undefined === tabInfo) {
            console.log('No tab found for given tabId.');
            return;
        }

        if (undefined === tabInfo.contractAddress || '' === tabInfo.contractAddress) {
            setContract(undefined);
            console.log('No contract address found for given tab.');
            return;
        };

        const contract = findContract(tabInfo.contractAddress);

        if (undefined === contract) {
            console.log('No contract found for given tab.');
            return;
        };


        if (contract[0] === tabInfo.contractAddress) {
            // update tab

            setContractAddress(contract[0]);
            setContract(contract[1]);

            const payloadLookup = {
                address: tabInfo.contractAddress,
                source: contract[1].metadataSource || MetadataSources.Sourcify,
                ...(contract[1].metadataSource === MetadataSources.Sourcify ? { chainId: contract[1].metadataAtChainId || userChainId } : {}),
                ...(contract[1].metadataSource === MetadataSources.BytecodeMetadata ? { rpcProvider: client as unknown as EthereumProvider } : {})
            }

            getMetadataFromAddress(payloadLookup).then((metadata) => {
                console.log(metadata);
            }).catch((err) => {

            });
        }
    }, [tabInfo, findContract, client, userChainId]);

    const handleContractExecute = async (
        method: AbiFunction,
        params: { [key: string]: string },
        stateSetCallback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
        setErrorCallback: React.Dispatch<React.SetStateAction<string>>,
        setTxHash: React.Dispatch<React.SetStateAction<string | undefined>>,
        options?: { [key: string]: string | number | bigint },
    ) => {
        const callParams = Object.keys(params).map((key) => params[key])
        if (mode === "read") {
            console.log(callParams)
            try {
                const results = await client.readContract({
                    // @ts-ignore
                    address: contractAddress,
                    abi: contract?.abi,
                    functionName: method.name,
                    args: callParams,
                    ...(options ? { ...options } : {})
                });


                console.log(results)
                console.log(typeof results)

                if (typeof results === "boolean") {
                    stateSetCallback({ 'result': results === true ? "True" : "False" });
                    return;
                } else if (typeof results === "string") {
                    stateSetCallback({ 'result': results });
                    return;
                } else if (typeof results === "number") {
                    // @ts-ignore
                    stateSetCallback({ 'result': results?.toString() });
                    return;
                } else if (typeof results === 'bigint') {
                    // @ts-ignore
                    stateSetCallback({
                        // @ts-ignore
                        'result': results.toString()
                    })
                    return;
                } else if (typeof results === "object") {
                    stateSetCallback(results as unknown as { [key: string]: string });
                    return;
                } else if (Array.isArray(results)) {
                    // @ts-ignore
                    stateSetCallback(results.map((item: string) => item.toString()) as unknown as { [key: string]: string });
                } else {
                    stateSetCallback({ 'result': results as unknown as string });
                }
            } catch (err: any) {
                console.log(err);

                if (err && err.message) {
                    setErrorCallback(err?.message);
                } else {
                    setErrorCallback('Error while executing contract method. More details in console.');
                }
            }
        } else if (mode === "write") {
            if (!wallet) {
                setErrorCallback('Wallet is not connected');
                return;
            }

            try {
                const _paramsCall = {
                    address: contractAddress,
                    abi: contract?.abi,
                    functionName: method.name,
                    args: callParams,
                };

                setTxHash(undefined);


                const results = await wallet.writeContract(
                    // @ts-ignore
                    _paramsCall,
                );

                setTxHash(results);

                // if (typeof results === "boolean") {
                //     stateSetCallback({ 'result': results === true ? "True" : "False" });
                //     return;
                // } else if (typeof results === "string") {
                //     stateSetCallback({ 'result': results });
                //     return;
                // } else if (typeof results === "number") {
                //     // @ts-ignore
                //     stateSetCallback({ 'result': results?.toString() });
                //     return;
                // } else if (typeof results === 'bigint') {
                //     // @ts-ignore
                //     stateSetCallback({
                //         // @ts-ignore
                //         'result': results.toString()
                //     })
                //     return;
                // } else if (typeof results === "object") {
                //     stateSetCallback(results as unknown as { [key: string]: string });
                //     return;
                // } else if (Array.isArray(results)) {
                //     // @ts-ignore
                //     stateSetCallback(results.map((item: string) => item.toString()) as unknown as { [key: string]: string });
                // } else {
                //     stateSetCallback({ 'result': results as unknown as string });
                // }
            } catch (err: any) {
                console.log(err);

                if (err && err.message) {
                    setErrorCallback(err?.message);
                } else {
                    setErrorCallback('Error while executing contract method. More details in console.');
                }
            }
        }
    }

    const [gridValue, setGridValue] = useState<number>(4);

    if (undefined === props.tabId || 'new' === props.tabId) return (<>
        <TabAdd />
    </>);

    return (
        <>
            <Box>
                {/* {props.tabId} */}
                <Grid container gap={0}>
                    <Grid item xs={gridValue}>
                        <ContractSelector setDynamicGrid={setGridValue} tabId={props.tabId} />
                    </Grid>
                    <Grid item xs={8} sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <TabSettings tabId={props.tabId} />
                    </Grid>
                </Grid>

                <Divider sx={{
                    mt: 1,
                    mb: 1
                }} />

                <TabInfoBlock tabId={props.tabId} />


                <Divider sx={{
                    mt: 1,
                    mb: 1
                }} />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>

                    <TabModeSwitcher
                        tabId={props.tabId}
                        currentMode={mode}
                        isProxy={true}
                        onChangeMode={(mode) => setMode(mode)}
                    />



                </Box>

                {filteredMethods && filteredMethods.map((method: AbiFunction, index: number) => {
                    return (<TabMethod
                        key={`method-${index}-${mode}-${contractAddress}`}
                        details={method as AbiFunction}
                        onCall={(
                            params,
                            stateSetCallback,
                            setErrorCallback,
                            setTxHash,
                            options
                        ) => {
                            handleContractExecute(
                                method,
                                params,
                                stateSetCallback,
                                setErrorCallback,
                                setTxHash,
                                options
                            );
                        }}
                    />)
                })}
            </Box>
        </>
    );
}