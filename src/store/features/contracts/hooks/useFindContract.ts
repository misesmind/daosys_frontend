import { useMemo } from "react";
import { useContractsList } from "./useContractsList";

export const useFindContract = (address: string | undefined) => {

    const { findContract } = useContractsList();

    return useMemo(() => {
        if (!address) return undefined;
        return findContract(address);
    }, [address, findContract]);
}