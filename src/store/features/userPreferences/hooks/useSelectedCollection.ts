import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";

export const useSelectedCollection = () => {

    const selectedCollection = useAppSelector((state) => state.userPreferencesSlice.selectedCollection);


    const dispatch = useAppDispatch();

    const changeCollection = useCallback((collection: string) => {
        dispatch({
            type: 'userPreferencesSlice/changeCollection',
            payload: collection,
        });
    }, [dispatch]);


    return useMemo(() => ({
        selectedCollection,
        changeCollection,
    }), [selectedCollection, changeCollection]);
}

export default useSelectedCollection;