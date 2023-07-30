import { configureStore } from '@reduxjs/toolkit'
import collectionsSlice from './features/collections/collectionsSlice'
import userPreferencesSlice from './features/userPreferences/userPreferencesSlice'
import contractsSlice from './features/contracts/contractsSlice'

export const store = configureStore({
    reducer: {
        collectionsSlice,
        userPreferencesSlice,
        contractsSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store