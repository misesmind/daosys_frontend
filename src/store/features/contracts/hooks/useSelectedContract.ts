import { useAppSelector } from "@/store/hooks"
import { useEffect, useMemo, useState } from "react"
import useSelectedTab from "../../userPreferences/hooks/useSelectedTab";
import useTabs from "../../tabs/hooks/useTabs";
import { useContractsList } from "./useContractsList";


export const useSelectedContract = () => {
    const [selectedContract, setSelectedContract] = useState<string | undefined>(undefined);
    const [selectedContractABI, setSelectedContractABI] = useState<any | undefined>(undefined);

    const tab = useSelectedTab();
    const { tabs } = useTabs();
    const { findContract } = useContractsList();

    useEffect(() => {
        if (!tab || !tabs) return;

        const selectedTab = tabs.find(t => t.id === tab.selectedTab);

        if (!selectedTab) return;

        setSelectedContract(selectedTab.contractAddress);
        setSelectedContractABI(
            findContract(selectedTab.contractAddress)?.[1].abi
        )

    }, [tab, tabs, findContract]);

    return useMemo(() => ({
        selectedContract,
        selectedContractABI,
    }), [selectedContract, selectedContractABI])
}