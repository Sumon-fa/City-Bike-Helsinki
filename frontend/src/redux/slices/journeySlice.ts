import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { GetAllJourneys, ImportJourneyResponse, Journey, JourneyState } from '../../types/journey'
import { getAllJourneys, importJourney, newJourney } from '../methods/journeyMethods'

const initialState: JourneyState = {
  journeys: [],
  totalJourneys: 0,
  journey: null,
  isLoading: false,
  isError: null,
  imporJourneytResponse: null,
}

const journeySlice = createSlice({
  name: 'journey',
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.isError = null
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
        state.isLoading = false
        state.journey = null
        return state
      }
      state.journey = action.payload
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(newJourney.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.journey = null
    })
    build.addCase(newJourney.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.journey = null
    })

    build.addCase(
      importJourney.fulfilled,
      (state, action: PayloadAction<ImportJourneyResponse>) => {
        if (!action.payload) {
          return state
        }
        if ('message' in action.payload) {
          state.isError = action.payload
          state.isLoading = false
          state.imporJourneytResponse = null
          return state
        }
        state.imporJourneytResponse = action.payload
        state.isLoading = false
        state.isError = null
        console.log(current(state))

        return state
      }
    )
    build.addCase(importJourney.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.imporJourneytResponse = null
    })
    build.addCase(importJourney.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.imporJourneytResponse = null
    })
  },
})
export const journeyActions = journeySlice.actions

export default journeySlice
