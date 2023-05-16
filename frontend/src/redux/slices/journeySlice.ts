import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetAllJourneys, Journey, JourneyState } from '../../types/journey'
import { getAllJourneys, newJourney } from '../methods/journeyMethods'

const initialState: JourneyState = {
  journeys: [],
  journey: null,
  totalJourneys: 0,
  isLoading: false,
  isError: null,
  isSuccess: false,
}

const journeySlice = createSlice({
  name: 'journey',
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.isError = null
    },
    clearSuccess(state) {
      state.isSuccess = false
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllJourneys.fulfilled, (state, action: PayloadAction<GetAllJourneys>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        state.isLoading = false
        state.journeys = []
        state.totalJourneys = 0
        return state
      }
      state.journeys = action.payload.result
      state.totalJourneys = action.payload.totalItems
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(getAllJourneys.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.journeys = []
      state.totalJourneys = 0
    })
    build.addCase(getAllJourneys.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.totalJourneys = 0
    })

    build.addCase(newJourney.fulfilled, (state, action: PayloadAction<Journey>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        state.journey = null
        state.isLoading = false
        state.isSuccess = false
        return state
      }
      state.journey = action.payload
      state.isLoading = false
      state.isError = null
      state.isSuccess = true
      return state
    })
    build.addCase(newJourney.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.journey = null
      state.isSuccess = false
    })
    build.addCase(newJourney.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.journey = null
      state.isSuccess = false
    })
  },
})

export const journeyActions = journeySlice.actions

export default journeySlice
