import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import axiosInstance from '../../common/axiosInstance'
import { GetAllStations } from '../../types/station'

export const getAllStations = createAsyncThunk(
  'getAllStations',
  async (filter: { title: string; pageNumber: number }, thunkApi) => {
    try {
      const pageSize = 8
      let link = '/api/v1/stations'
      if (filter) {
        link = `/api/v1/stations?page=${filter.pageNumber}&pageSize=${pageSize}&searchKeyWord=${filter.title}`
      }

      const response: AxiosResponse<GetAllStations, GetAllStations> = await axiosInstance.get(link)
      return response.data
    } catch (err: any) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
)
