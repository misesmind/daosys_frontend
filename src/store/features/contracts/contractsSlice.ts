import { MetadataSources } from "@ethereum-sourcify/contract-call-decoder";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Abi } from "viem";

export type ContractItem = {
    // @ts-ignore
    abi: typeof Abi;
    name: string | undefined;
    metadataAvailable: boolean;
    metadataSource: MetadataSources | undefined;
    metadataAtChainId: number | undefined;
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
            state.items[action.payload.address] = action.payload.contract;
        },
        removeContract: (state, action) => {
            delete state.items[action.payload.address];
        }
    }
})

export const { addContract, removeContract } = contractsSlice.actions;

export default contractsSlice.reducer;