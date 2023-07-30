import { useState, useCallback, useMemo, useEffect } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { MetadataSources, getMetadataFromAddress } from "@ethereum-sourcify/contract-call-decoder";
import { EthereumProvider } from "ethereum-provider";
import { GetContractReturnType, isAddress } from "viem";
import { getContract } from "viem";

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
    const [contract, setContract] = useState<GetContractReturnType | undefined>(undefined);

    useEffect(() => {
        if (!isAddress(contractAddress)) {
            setLoadingState('invalid-address');
        } else {
            setLoadingState('none');
        }
    }, [contractAddress]);


    const loadContract = useCallback(async (contractAddress: string, manualAbi: string) => {
        try {
            console.log(manualAbi);
            setLoadingState('loading-contract');
            const contract = getContract({
                address: contractAddress,
                abi: manualAbi,
                walletClient: wallet,
            });
            setLoadingState('contract-loaded');
            setContract(contract);
            return contract;
        } catch (e) {
            console.log(e);
            setLoadingState('contract-error');
        }
    }, [wallet]);


    const loadContractMetadata = useCallback(async (metadataSource: MetadataSources, chainId: number) => {

        const metadataFetchPayload = {
            address: contractAddress,
            source: metadataSource,
            ...(metadataSource === MetadataSources.Sourcify ? { chainId: chainId } : {}),
            ...(metadataSource === MetadataSources.BytecodeMetadata ? { rpcProvider: client as unknown as EthereumProvider } : {}),
        }

        try {
            setLoadingState('loading-metadata');

            const metadata = await getMetadataFromAddress(metadataFetchPayload);

            if (!metadata) {
                setLoadingState('metadata-not-found');
            } else {
                setLoadingState('loading-abi');

                const abi = metadata.output.abi;
                setLoadingState('contract-loaded');

                loadContract(contractAddress, abi);
            }
        } catch (e) {
            console.log(e);
            setLoadingState('metadata-not-found');
        }

        console.log(loadingState);
    }, [client, contractAddress, loadContract, loadingState]);



    return useMemo(() => ({
        loadingState,
        loadContractMetadata,
        loadContract,
        contract
    }), [loadingState, loadContractMetadata, loadContract, contract]);

}