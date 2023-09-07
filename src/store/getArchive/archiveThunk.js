import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getArchive = createAsyncThunk(
   'archiveData/get',
   async (boardId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/boards/get-all-archive/${boardId}`
         )
         console.log(response.data)
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
