import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import axiosInstance from '../../common/axiosInstance'
import {
  CreateStation,
  FileData,
  GetAllStations,
  ImportStationResponse,
  NewStation,
  StationDetails,
} from '../../types/station'

export const getAllStations = createAsyncThunk(
  'getAllStations',
  async (filter: { searchKeyWord: string; pageNumber: number }, thunkApi) => {
    try {
      const pageSize = 8
      let link = '/api/v1/stations'
      if (filter) {
        link = `/api/v1/stations?page=${filter.pageNumber}&pageSize=${pageSize}&searchKeyWord=${filter.searchKeyWord}`
      }

      const response: AxiosResponse<GetAllStations, GetAllStations> = await axiosInstance.get(link)
      return response.data
    } catch (err: any) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
)

export const getStationDetails = createAsyncThunk(
  'getStationDetails',
  async (id: number, thunk) => {
    try {
      const response: AxiosResponse<StationDetails, StationDetails> = await axiosInstance.get(
        `/api/v1/station/${id}`
      )
      return response.data
    } catch (err: any) {
      return thunk.rejectWithValue({ message: err.message })
    }
  }
)

export const importStation = createAsyncThunk('importStation', async (data: FileData, thunk) => {
  try {
    const response: AxiosResponse<ImportStationResponse, ImportStationResponse> =
      await axiosInstance.post('/api/v1/station/import', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    return response.data
  } catch (err: any) {
    return thunk.rejectWithValue({ message: err.message })
  }
})

export const newStation = createAsyncThunk('newStation', async (data: CreateStation, thunk) => {
  try {
    const response: AxiosResponse<NewStation, NewStation> = await axiosInstance.post(
      '/api/v1/station/new',
      data
    )
    console.log(response.data)

    return response.data
  } catch (err: any) {
    return thunk.rejectWithValue({ message: err.message })
  }
})
