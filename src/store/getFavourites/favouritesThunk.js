import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getFavourites = createAsyncThunk(
   'favorite/get',
   async (_, { rejectWithValue }) => {
      try {
         const responce = await axiosInstance.get('/api/favorites')

         return responce
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
export const toggleFavoriteaBoard = createAsyncThunk(
   'favorite/toggle',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/favorites/board/${id}`)
         dispatch(getFavourites())
      } catch (error) {
         rejectWithValue(error.response.data)
      }
   }
)

export const toggleFavoriteWorkSpace = createAsyncThunk(
   'favorite/togglework',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/favorites/work_space/${id}`)
         dispatch(getFavourites())
      } catch (error) {
         rejectWithValue(error.response.data)
      }
   }
)
