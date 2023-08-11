import Box from "@/components/Box";
import React, { FC, useEffect } from "react";
import { TabAdd } from "./TabAdd";
import { ContractSelector } from "../../contracts/components/ContractSelector";
import { useContractsList } from "../../contracts/hooks/useContractsList";
import { useAppSelector } from "@/store/hooks";
import { MetadataSources, getMetadataFromAddress } from "@ethereum-sourcify/contract-call-decoder";
import { useChainId, usePublicClient } from "wagmi";
import { EthereumProvider } from "ethereum-provider";

export type TabViewerProps = {
    tabId: string | undefined | number;
}

export const TabViewer: FC<TabViewerProps> = (props: TabViewerProps) => {

    // tab updater

    const { findContract } = useContractsList({});
    const tabInfo = useAppSelector(state => state.tabsSlice.tabs.find(tab => tab.id === props.tabId));

    const client = usePublicClient();
    const userChainId = useChainId();

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
                console.error(err);
            });
        }
    }, [tabInfo, findContract, client, userChainId]);


    if (undefined === props.tabId || 'new' === props.tabId) return (<>
        <TabAdd />
    </>);

    return (
        <>
            <Box>
                {/* {props.tabId} */}

                <ContractSelector tabId={props.tabId} />
            </Box>
        </>
    );
}