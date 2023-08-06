'use client'

import { configureStore } from '@reduxjs/toolkit'
import collectionsSlice, { initialState as collectionsInitialState } from './features/collections/collectionsSlice'
import userPreferencesSlice, { initialState as userPreferencesInitialState } from './features/userPreferences/userPreferencesSlice'
import contractsSlice, { initialState as contractsInitialState } from './features/contracts/contractsSlice'

export const store = configureStore({
    reducer: {
        collectionsSlice,
        userPreferencesSlice,
        contractsSlice,
    },
    preloadedState: {
        ...(typeof localStorage !== 'undefined' ? {
            collectionsSlice: JSON.parse(localStorage!.getItem('redux::collections') || JSON.stringify(collectionsInitialState)),
            userPreferencesSlice: JSON.parse(localStorage!.getItem('redux::userPreferences') || JSON.stringify(userPreferencesInitialState)),
            contractsSlice: JSON.parse(localStorage!.getItem('redux::contracts') || JSON.stringify(contractsInitialState)),
        } : {})
    }
});

store.subscribe(() => {
    if (typeof localStorage === undefined) return
    localStorage!.setItem('redux::collections', JSON.stringify(store.getState().collectionsSlice))
    localStorage!.setItem('redux::userPreferences', JSON.stringify(store.getState().userPreferencesSlice))
    localStorage!.setItem('redux::contracts', JSON.stringify(store.getState().contractsSlice))
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store