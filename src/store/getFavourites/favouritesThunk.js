import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getFavourites = createAsyncThunk(
   'favorite/get',
   async (_, { rejectWithValue }) => {
      try {
         const responce = await axiosInstance.get('/api/favorites')
         console.log('responce: ', responce.data)
         return responce
      } catch (error) {
         console.log('error: ', error)
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
         console.log('ERROR WORK_SPACE', error)
         rejectWithValue(error.response.data)
      }
   }
)
