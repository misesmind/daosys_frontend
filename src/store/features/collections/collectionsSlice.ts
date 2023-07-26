import { createSlice } from "@reduxjs/toolkit";

type CollectionItem = {
    address: string;
    abi: string | undefined,
    tag: string | undefined,
    name: string | undefined,
    createdAt: number | undefined,
}

export interface CollectionsState {
    items: CollectionItem[],
}

const initialState: CollectionsState = {
    items: [],
}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection: (state, action) => {
            state.items.push(action.payload);
        }
    }
})

export const { addCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;