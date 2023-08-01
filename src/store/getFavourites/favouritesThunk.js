import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants/baseURL'

export const getFavourites = createAsyncThunk(
   'favourite/getFavourites',
   // eslint-disable-next-line consistent-return
   async (_, { rejectWithValue }) => {
      try {
         const response = await axios.get(BASE_URL)
         console.log(response)
         return response
      } catch (error) {
         rejectWithValue(error)
      }
   }
)
