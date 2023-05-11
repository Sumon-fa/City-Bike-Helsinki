import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import {
  CreateJourney,
  FileData,
  GetAllJourneys,
  ImportJourneyResponse,
  Journey,
} from '../../types/journey'
import axiosInstance from '../../common/axiosInstance'

export const getAllJourneys = createAsyncThunk(
  'getAlljourneys',
  async (filter: { searchKeyWord: string; pageNumber: number }, thunkApi) => {
    try {
      const pageSize = 8
      let link = '/api/v1/journeys'
      if (filter) {
        link = `/api/v1/journeys?page=${filter.pageNumber}&pageSize=${pageSize}&searchKeyWord=${filter.searchKeyWord}`
      }

      const response: AxiosResponse<GetAllJourneys, GetAllJourneys> = await axiosInstance.get(link)
      return response.data
    } catch (err: any) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
)

export const newJourney = createAsyncThunk('newJourney', async (journey: CreateJourney, thunk) => {
  try {
    const response: AxiosResponse<Journey, Journey> = await axiosInstance.post(
      '/api/v1/journey/new',
      journey
    )

    console.log(response.data)
    return response.data
  } catch (err: any) {
    console.log(err)
    return thunk.rejectWithValue({ message: err.message })
  }
})

export const importJourney = createAsyncThunk('importJourney', async (data: FileData, thunk) => {
  try {
    const response: AxiosResponse<ImportJourneyResponse, ImportJourneyResponse> =
      await axiosInstance.post('/api/v1/journey/import', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    console.log(response.data)
    return response.data
  } catch (err: any) {
    console.log(err)
    return thunk.rejectWithValue({ message: err.message })
  }
})
