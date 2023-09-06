import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type HistoryItem = {
    address: string,
    type: "read" | "write" | "deploy" | "unknown",
    method: string,
    from: string,
    args: string[],
    timestamp: number,
    txHash: string | undefined,

}

export const initialState: {
    items: { [key: string]: HistoryItem } // key is contract address
} = {
    items: {},
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistoryRecord(state, action: PayloadAction<{ address: string; record: HistoryItem }>) {
            state.items[action.payload.address] = action.payload.record;
        }
    }
})

export const { addHistoryRecord } = historySlice.actions;

export default historySlice.reducer;