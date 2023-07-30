import { createSlice } from "@reduxjs/toolkit";


export type ContractItem = {
    address: string;
    abi: string | undefined,
    tag: string | undefined,
    name: string | undefined,
    chainId: number | undefined,
    createdAt: number | undefined,
}

const initialState: {
    items: { [key: string]: ContractItem } // key is contract address
} = {
    items: {},
};

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        addContract: (state, action) => {
            state.items[action.payload.address] = action.payload.contract;
        },
        removeContract: (state, action) => {
            delete state.items[action.payload.address];
        }

    }
})

export const { addContract } = contractsSlice.actions;

export default contractsSlice.reducer;