import { useState, useCallback, useMemo, useEffect } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { MetadataSources, getMetadataFromAddress } from "@ethereum-sourcify/contract-call-decoder";
import { EthereumProvider } from "ethereum-provider";
import { isAddress } from "viem";

export type ContractLoadingState =
    'none' |
    'invalid-address' |
    'loading-metadata' |
    'metadata-not-found' |
    'loading-abi' |
    'abi-error' |
    'loading-contract' |
    'contract-error' |
    'contract-loaded';

export const useLoadContract = (
    contractAddress: string,
) => {
    const client = usePublicClient();
    const wallet = useWalletClient();

    const [loadingState, setLoadingState] = useState<ContractLoadingState>('none');
    const [abi, setAbi] = useState<any>();

    useEffect(() => {
        if (!isAddress(contractAddress)) {
            setLoadingState('invalid-address');
        } else {
            setLoadingState('none');
        }
    }, [contractAddress]);


    const loadContractMetadata = useCallback(async (metadataSource: MetadataSources) => {

        let abi = null;

        const metadataFetchPayload = {
            address: contractAddress,
            source: metadataSource,
            ...(metadataSource === MetadataSources.Sourcify ? { chainId: await client.getChainId() } : {}),
            ...(metadataSource === MetadataSources.BytecodeMetadata ? { rpcProvider: client as unknown as EthereumProvider } : {}),
        }

        try {
            setLoadingState('loading-metadata');

            const metadata = await getMetadataFromAddress(metadataFetchPayload);

            if (!metadata) {
                setLoadingState('metadata-not-found');
            } else {
                setLoadingState('loading-abi');
                abi = metadata.abi;
                setAbi(abi);
                setLoadingState('contract-loaded');
            }
        } catch (e) {
            console.log(e);
            setLoadingState('metadata-not-found');
        }

        console.log(loadingState);
    }, [client, contractAddress, loadingState]);

    return useMemo(() => ({
        loadingState,
        loadContractMetadata,
    }), [loadingState, loadContractMetadata]);

}