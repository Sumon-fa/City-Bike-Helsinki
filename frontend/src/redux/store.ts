import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import journeySlice from './slices/journeySlice'

export const store = configureStore({
  reducer: {
    journey: journeySlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
