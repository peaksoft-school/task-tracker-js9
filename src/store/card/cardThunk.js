import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const CardPost = createAsyncThunk(
   'card/cardPost',
   async (objCard, { rejectWithValue }) => {
      console.log(objCard)
      try {
         await axiosInstance.post('/api/cards', objCard)
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const AttachmentPos = createAsyncThunk(
   'attachment/attachmentPost',
   async (objCard, { rejectWithValue }) => {
      console.log(objCard)
      try {
         await axiosInstance.post('/api/attachments', objCard)
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const AttachmentRemove = createAsyncThunk(
   'attachment/attachmentRemove',
   async (id, { rejectWithValue }) => {
      console.log(id)
      try {
         await axiosInstance.delete(`/api/attachments/${12}`)
      } catch (error) {
         rejectWithValue(error)
      }
   }
)
