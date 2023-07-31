import { createSlice } from "@reduxjs/toolkit";

export interface UserPreferencesState {
    theme: string,
    selectedCollection: string | undefined,
}

export const initialState: UserPreferencesState = {
    theme: 'dark',
    selectedCollection: '',
}

export const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
        }
    }
});

export const { setTheme, setSelectedCollection } = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
