import { useState, useCallback, useMemo } from "react";
import { useWalletClient, usePublicClient } from "wagmi";

export const useLoadContract = (
    address: string,
    abiResolver: () => Promise<any>,
    options?: any
) => {
    const client = usePublicClient();
    const wallet = useWalletClient();

    const [contract, setContract] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);



}