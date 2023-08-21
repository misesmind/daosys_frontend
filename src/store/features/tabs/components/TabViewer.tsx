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

export type TabViewerProps = {
    tabId: string | undefined | number;
}

export const TabViewer: FC<TabViewerProps> = (props: TabViewerProps) => {

    // tab updater

    const { findContract } = useContractsList({});
    const tabInfo = useAppSelector(state => state.tabsSlice.tabs.find(tab => tab.id === props.tabId));

    const client = usePublicClient();
    const { data: wallet } = useWalletClient();
    const userChainId = useChainId();

    const [mode, setMode] = useState<TabSwitcherMode>("read");

    const [contractAddress, setContractAddress] = useState<string | undefined>(undefined);
    const [contract, setContract] = useState<ContractItem | undefined>(undefined);

    const filteredMethods = useMemo(() => {
        if (undefined === contract) return [];
        if ('' === contract.abi) return [];

        console.log(contract.abi);

        if (mode === "read") {

            return contract.abi.filter((method: { stateMutability: string; }) => method.stateMutability === "view" || method.stateMutability === "pure") ?? [];
        } else if (mode === "write") {
            return contract.abi.filter((method: { stateMutability: string; type: string; }) => method.stateMutability === "nonpayable" || method.stateMutability === "payable")
                .filter((method: { type: string; }) => method.type === "function") ?? [];
        }  // todo implement proxy support
    }, [contract, mode]);

    useEffect(() => {

        if (undefined === tabInfo) return;
        console.log(1)
        if (undefined === tabInfo.contractAddress) return;
        console.log(11)

        const contract = findContract(tabInfo.contractAddress);
        console.log(11)

        if (undefined === contract) return;
        console.log(21)


        if (contract[0] === tabInfo.contractAddress) {
            // update tab
            console.log(contract[1])

            setContractAddress(contract[0]);
            setContract(contract[1]);




            const payloadLookup = {
                address: tabInfo.contractAddress,
                source: contract[1].metadataSource || MetadataSources.Sourcify,
                ...(contract[1].metadataSource === MetadataSources.Sourcify ? { chainId: contract[1].metadataAtChainId || userChainId } : {}),
                ...(contract[1].metadataSource === MetadataSources.BytecodeMetadata ? { rpcProvider: client as unknown as EthereumProvider } : {})
            }

            console.log(payloadLookup)



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
        setErrorCallback: React.Dispatch<React.SetStateAction<string>>
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
                    args: callParams
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
                const results = wallet.writeContract({
                    // @ts-ignore
                    address: contractAddress,
                    abi: contract?.abi,
                    functionName: method.name,
                    args: callParams
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
        }
    }


    if (undefined === props.tabId || 'new' === props.tabId) return (<>
        <TabAdd />
    </>);

    return (
        <>
            <Box>
                {/* {props.tabId} */}
                <Grid container gap={0.5}>
                    <Grid item xs={12}>
                        <ContractSelector tabId={props.tabId} />
                    </Grid>
                    <Grid item xs={7.5} sx={{
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
                        key={`method-${index}-${mode}`}
                        details={method as AbiFunction}
                        onCall={(
                            params,
                            stateSetCallback,
                            setErrorCallback
                        ) => {
                            handleContractExecute(method, params, stateSetCallback, setErrorCallback);
                        }}
                    />)
                })}
            </Box>
        </>
    );
}