import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { getCardbyId } from '../cards/cardsThunk'

export const estimationPostRequest = createAsyncThunk(
   'estimations/estimationPostRequest',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/estimations', data)
         dispatch(getCardbyId({ cardId: data.cardId }))
         return response.data.estimationId
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const estimationPutRequest = createAsyncThunk(
   'estimations/estimationPutRequest',
   async (data, { rejectWithValue }) => {
      try {
         await axiosInstance.put(`/api/estimations/${data.estimationId}`, data)
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
