import { createSlice } from "@reduxjs/toolkit";

type CollectionItem = {
    address: string;
    abi: string | undefined,
    tag: string | undefined,
    name: string | undefined,
    createdAt: number | undefined,
}

interface CollectionMap {
    [key: string]: CollectionItem
}

export interface CollectionsState {
    items: CollectionMap
}

export const initialState: CollectionsState = {
    items: {},
}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection: (state, action) => {
            state.items[action.payload.name] = action.payload.collection;
        }
    }
})

export const { addCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;