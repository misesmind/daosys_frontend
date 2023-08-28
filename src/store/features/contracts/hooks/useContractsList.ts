import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";



export interface ContractsListProps {
    filter?: string,
}

export const useContractsList = (props: ContractsListProps = {}) => {
    const all = useAppSelector(state => state.contractsSlice.items);

    const contracts = useMemo(() => {
        if (props.filter) {
            return Object.entries(all).filter(([address, contract]) => {
                if (props.filter?.startsWith('0x')) {
                    return address.toLowerCase().includes(props.filter.toLowerCase());
                } else if (typeof props.filter === 'string') {
                    return contract.abi.name.toLowerCase().includes(props.filter.toLowerCase());
                }
            });
        } else {
            return Object.entries(all);
        }
    }, [all, props.filter]);

    const findContract = useCallback((address: string) => {
        return contracts.find(([contractAddress, contract]) => contractAddress === address);
    }, [contracts]);

    return useMemo(() => ({
        contracts,
        findContract,
    }), [contracts, findContract]);
}