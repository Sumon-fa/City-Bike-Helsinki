import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import journeySlice from './slices/journeySlice'
import stationSlice from './slices/stationSlice'

export const store = configureStore({
  reducer: {
    journey: journeySlice.reducer,
    station: stationSlice.reducer,
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
