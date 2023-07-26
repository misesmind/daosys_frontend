import { useState, useCallback, useMemo } from "react";
import { useWalletClient, usePublicClient } from "wagmi";

export const useLoadContract = (
    address: string,
    abiResolver: () => Promise<any>,
    options?: any
) => {
    const client = usePublicClient();



}