import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const searchRequest = createAsyncThunk(
   'search/searchGet',
   async (data, { rejectWithValue }) => {
      console.log('data: ', data)
      try {
         const response = await axiosInstance.get(
            `/api/profile/global-search?search=${data}`
         )
         console.log('response: ', response.data)

         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)
