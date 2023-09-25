import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const attachmentGet = createAsyncThunk(
   'card/attachmentGet',
   async (cardId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/attachments/${cardId}`)
         return data
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentPost = createAsyncThunk(
   'card/attachmentPost',
   async (objCard, { rejectWithValue, dispatch }) => {
      console.log(objCard)
      try {
         await axiosInstance.post('/api/attachments', objCard)
         dispatch(attachmentGet(objCard.cardId))
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

         dispatch(attachmentGet(id))
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const attachmentPhotoPost = createAsyncThunk(
   'card/attachmentPhotoPost',
   async ({ obj, id }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`/api/file`, obj, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })
         dispatch(
            attachmentPost({
               documentLink: data.Link,
               cardId: id,
            })
         )
         return data.Link
      } catch (error) {
         rejectWithValue(error)
      }
   }
)
