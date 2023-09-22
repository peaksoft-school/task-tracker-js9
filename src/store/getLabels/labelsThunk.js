import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLabels = createAsyncThunk(
   'labels/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/labels')
         console.log('response: label ', response.data)
         return response.data
      } catch (error) {
         rejectWithValue(error.response.data)
      }
   }
)

export const getAllLabelByCardId = createAsyncThunk(
   'labels/getLabelByCardId',
   async (cardId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `api/labels/card-labels/${cardId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)

export const postLabel = createAsyncThunk(
   'labels/post',
   async ({ description, color }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post('/api/labels', {
            description,
            color,
         })
         dispatch(getLabels())
         return response.data
      } catch (error) {
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

export const putLabels = createAsyncThunk(
   'labels/put',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.put(
            `/api/labels/add-label-to-card/${payload.cardId}/58`
         )
         dispatch(getAllLabelByCardId(payload.cardId))
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
