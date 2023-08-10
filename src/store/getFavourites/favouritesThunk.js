import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getFavourites = createAsyncThunk(
   'favourite/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/favorites')
         console.log('response:', response)
         return response.data
      } catch (error) {
         console.log('ERROR', error)
         rejectWithValue(error.response.data)
      }
   }
)
export const toggleFavoriteaBoard = createAsyncThunk(
   'favourite/toggle',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         console.log(id)
         await axiosInstance.post(`/api/favorites/board/${id}`)
         dispatch(getFavourites())
      } catch (error) {
         console.log('ERROR BOARD', error)
         rejectWithValue(error.response.data)
      }
   }
)

export const toggleFavoriteWorkSpace = createAsyncThunk(
   'favorite/togglework',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         console.log(id)
         await axiosInstance.post(`/api/favorites/work_space/${id}`)
         dispatch(getFavourites())
      } catch (error) {
         console.log('ERROR WORK_SPACE', error)
         rejectWithValue(error.response.data)
      }
   }
)
