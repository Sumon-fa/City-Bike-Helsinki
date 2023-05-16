import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetAllStations, NewStation, StationDetails, StationState } from '../../types/station'
import { getAllStations, getStationDetails, newStation } from '../methods/stationMethods'

const initialState: StationState = {
  stations: [],
  totalStations: 0,
  stationDetails: null,
  isLoading: false,
  isError: null,
  createdStation: null,
  isSuccess: false,
}

const stationSlice = createSlice({
  name: 'station',
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
        state.stationDetails = null
        return state
      }
      state.stationDetails = action.payload
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(getStationDetails.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.stationDetails = null
    })
    build.addCase(getStationDetails.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.stationDetails = null
    })

    build.addCase(newStation.fulfilled, (state, action: PayloadAction<NewStation>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        state.isLoading = false
        state.createdStation = null
        state.isSuccess = false
        return state
      }
      state.createdStation = action.payload
      state.isSuccess = true
      state.isLoading = false
      state.isError = null
      return state
    })
    build.addCase(newStation.rejected, (state, action: PayloadAction<any>) => {
      state.isError = action.payload
      state.isLoading = false
      state.createdStation = null
      state.isSuccess = false
    })
    build.addCase(newStation.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.createdStation = null
      state.isSuccess = false
    })
  },
})
export const stationActions = stationSlice.actions

export default stationSlice
