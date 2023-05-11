import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  GetAllStations,
  ImportStationResponse,
  StationDetails,
  StationState,
} from '../../types/station'
import { getAllStations, getStationDetails, importStation } from '../methods/stationMethods'

const initialState: StationState = {
  stations: [],
  totalStations: 0,
  station: null,
  isLoading: false,
  isError: null,
  importStationtResponse: null,
}

const stationSlice = createSlice({
  name: 'station',
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.isError = null
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllStations.fulfilled, (state, action: PayloadAction<GetAllStations>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        state.isLoading = false
        state.stations = []
        state.totalStations = 0
        return state
      }
      state.stations = action.payload.result
      state.totalStations = action.payload.totalItems
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(getAllStations.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.stations = []
      state.totalStations = 0
    })
    build.addCase(getAllStations.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.stations = []
      state.totalStations = 0
    })

    build.addCase(getStationDetails.fulfilled, (state, action: PayloadAction<StationDetails>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        state.isLoading = false
        state.station = null
        return state
      }
      state.station = action.payload
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(getStationDetails.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.station = null
    })
    build.addCase(getStationDetails.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.station = null
    })

    build.addCase(
      importStation.fulfilled,
      (state, action: PayloadAction<ImportStationResponse>) => {
        if (!action.payload) {
          return state
        }
        if ('message' in action.payload) {
          state.isError = action.payload
          state.isLoading = false
          state.importStationtResponse = null
          return state
        }
        state.importStationtResponse = action.payload
        state.isLoading = false
        state.isError = null
        return state
      }
    )
    build.addCase(importStation.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.importStationtResponse = null
    })
    build.addCase(importStation.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.importStationtResponse = null
    })
  },
})
export const stationActions = stationSlice.actions

export default stationSlice
