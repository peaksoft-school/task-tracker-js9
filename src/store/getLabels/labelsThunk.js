import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLabels = createAsyncThunk(
   'labels/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/labels')
         console.log('response: ', response)
         return response.data
      } catch (error) {
         console.log('ERROR', error)
         rejectWithValue(error.response.data)
      }
   }
)

export const deleteLabel = createAsyncThunk(
   'labels/delete',
   async (labelId, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`/api/labels/${labelId}`)
         dispatch(getLabels())
         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
