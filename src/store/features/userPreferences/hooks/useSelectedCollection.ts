import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export const useSelectedCollection = () => {

    const selectedCollection = useAppSelector((state) => state.userPreferencesSlice.selectedCollection);

    return useMemo(() => ({
        selectedCollection,
    }), [selectedCollection]);
}

export default useSelectedCollection;