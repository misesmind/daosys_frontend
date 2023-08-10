import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export type Tab = {
    id: string,
    title: string,
    contractAddress: string,
}

export const initialState: {
    tabs: Tab[]
} = {
    tabs: []
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addTab: (state, action) => {
            state.tabs.push(action.payload);
        },
        removeTab: (state, action) => {
            state.tabs = state.tabs.filter(tab => tab.id !== action.payload.id);
        },
        setTabTitle: (state, action) => {
            const tab = state.tabs.find(tab => tab.id === action.payload.id);
            if (tab) {
                tab.title = action.payload.title;
            }
        },
        setTabContractAddress: (state, action) => {
            const tab = state.tabs.find(tab => tab.id === action.payload.id);
            if (tab) {
                tab.contractAddress = action.payload.contractAddress;
            }
        }
    }
});

export const { addTab, removeTab, setTabTitle, setTabContractAddress } = tabsSlice.actions;

export default tabsSlice.reducer;
