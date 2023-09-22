import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getNotifications = createAsyncThunk(
   'participant/participantsGet',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/notifications`)
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
