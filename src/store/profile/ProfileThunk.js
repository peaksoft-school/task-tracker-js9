import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const profileGetRequest = createAsyncThunk(
   'profile/profileGetRequest',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/profile/me')
         return response.data
      } catch (error) {
         throw rejectWithValue(error.message)
      }
   }
)

export const profileProjectsRequest = createAsyncThunk(
   'profile/profileProjectsRequest',
   async (userId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/profile/${userId}`)
         console.log(response.data)
         return response.data
      } catch (error) {
         throw rejectWithValue(error.message)
      }
   }
)
