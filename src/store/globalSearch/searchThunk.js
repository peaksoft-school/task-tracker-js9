import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const searchRequest = createAsyncThunk(
   'search/searchGet',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/profile/global-search?search=${data}`
         )

         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)
