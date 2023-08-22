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
