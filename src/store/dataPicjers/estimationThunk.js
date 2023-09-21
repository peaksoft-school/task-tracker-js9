import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const estimationPostRequest = createAsyncThunk(
   'estimation/estimationPostRequest',
   async (data, { rejectedWithValue }) => {
      try {
         const response = await axiosInstance.post('api/estimations', data)
         return response.data
      } catch (err) {
         return rejectedWithValue(err)
      }
   }
)
