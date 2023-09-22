import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { getCardbyId } from '../cards/cardsThunk'

export const estimationPostRequest = createAsyncThunk(
   'estimations/estimationPostRequest',
   async (data, { dispatch, rejectWithValue }) => {
      console.log('data: ', data)
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
   async (data, { dispatch, rejectWithValue }) => {
      try {
         await axiosInstance.put(
            `/api/estimations/${data.values.estimationId}`,
            data.values
         )

         dispatch(getCardbyId({ cardId: data.cardId }))
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
