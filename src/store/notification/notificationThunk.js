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

export const markAsReadNotifications = createAsyncThunk(
   'participant/markAsRead',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(`/api/notifications`)
         dispatch(getNotifications())
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const notificationsById = createAsyncThunk(
   'participant/markAsRead',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.get(`/api/notifications/${id}`)
         dispatch(getNotifications())
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
