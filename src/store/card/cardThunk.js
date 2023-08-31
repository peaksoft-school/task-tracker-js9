import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const CardPost = createAsyncThunk(
   'card/cardPost',
   async (objCard, { rejectWithValue }) => {
      try {
         await axiosInstance.post('/api/cards', objCard)
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentGet = createAsyncThunk(
   'card/attachmentGet',
   async (cardId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/attachments/${33}`)
         return data
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentPost = createAsyncThunk(
   'card/attachmentPost',
   async (objCard, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post('/api/attachments', objCard)
         dispatch(attachmentGet())
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentRemove = createAsyncThunk(
   'card/attachmentRemove',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/attachments/${id}`)

         dispatch(attachmentGet())
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentPhotoPost = createAsyncThunk(
   'card/attachmentPhotoPost',
   async (obj, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`/api/file`, obj, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })
         dispatch(
            attachmentPost({
               documentLink: data.Link,
               cardId: 33,
            })
         )
         dispatch(attachmentPost())
         return data.Link
      } catch (error) {
         rejectWithValue(error)
      }
   }
)
