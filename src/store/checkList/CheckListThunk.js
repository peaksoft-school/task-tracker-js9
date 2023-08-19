import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFileInstance } from '../../config/axiosFileInstance'

export const checkListGetRequest = createAsyncThunk(
   'checkList/CheckListGetRequest',
   async (cardId) => {
      try {
         const response = await axiosFileInstance.get(
            `/api/checkList/${cardId}`
         )
         console.log('response: ', response.data)
         return response.data
      } catch (error) {
         return error.message
      }
   }
)
