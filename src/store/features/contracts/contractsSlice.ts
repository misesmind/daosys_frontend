import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Abi } from "viem";



export type ContractItem = {
    // @ts-ignore
    abi: typeof Abi;
}

export const initialState: {
    items: { [key: string]: ContractItem } // key is contract address
} = {
    items: {},
};

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        addContract: (state, action: PayloadAction<{ address: string; contract: ContractItem }>) => {
            console.log(action.payload);
            state.items[action.payload.address] = action.payload.contract;
        },
        removeContract: (state, action) => {
            delete state.items[action.payload.address];
        }

    }
})

export const { addContract, removeContract } = contractsSlice.actions;

export default contractsSlice.reducer;