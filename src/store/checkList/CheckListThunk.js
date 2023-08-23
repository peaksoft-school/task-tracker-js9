import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosFileInstance } from '../../config/axiosFileInstance'

export const checkListGetRequest = createAsyncThunk(
   'checkList/CheckListGetRequest',
   async (cardId) => {
      try {
         const response = await axiosFileInstance.get(
            `/api/checkList/${cardId}`
         )
         return response.data
      } catch (error) {
         return error.message
      }
   }
)
export const checkListPutRequest = createAsyncThunk(
   'checkList/CheckListPutRequest',
   async ({ checkListId, data }) => {
      try {
         const response = await axiosFileInstance.put(
            `/api/checkList/${checkListId}`,
            data
         )
         return response.data
      } catch (error) {
         return error.message
      }
   }
)
