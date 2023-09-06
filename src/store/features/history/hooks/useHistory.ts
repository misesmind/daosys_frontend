import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HistoryItem, addHistoryRecord } from '../historySlice';

export const useHistory = () => {
    const history = useAppSelector(state => state.historySlice.items);
    const dispatch = useAppDispatch();

    const add = useCallback((historyRecord: HistoryItem) => {
        dispatch(addHistoryRecord({
            address: historyRecord.address,
            record: historyRecord
        }));
    }, [dispatch]);

    const addRead = useCallback((address: string, method: string, from: string, args: string[]) => {
        add({
            address,
            type: "read",
            method,
            from,
            args,
            timestamp: Date.now()
        } as HistoryItem);
    }, [add]);

    const addWrite = useCallback((address: string, method: string, from: string, args: string[], txHash: string) => {
        add({
            address,
            type: "write",
            method,
            from,
            args,
            txHash,
            timestamp: Date.now()
        } as HistoryItem);
    }, [add]);

    return useMemo(() => ({
        history,
        add,
        addRead,
        addWrite
    }), [add, addRead, addWrite, history]);
}
