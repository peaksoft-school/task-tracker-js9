import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getBoardFilter = createAsyncThunk(
   'boardFilter/getBoardFilter',
   async ({ boardId, duration }, { rejectWithValue }) => {
      console.log('duration: ', duration)
      console.log('boardId: ', boardId)
      console.log('checked: ')

      try {
         const response = await axiosInstance.get(
            `/api/boards/${boardId}/filter?noDates=${duration}`
         )
         console.log('response: ', response)

         return response
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
