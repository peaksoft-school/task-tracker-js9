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

export const getCardArchve = createAsyncThunk(
   'archiveData/put',
   async (cardId, { rejectWithValue }) => {
      console.log('cardId: ', cardId)

      try {
         const response = await axiosInstance.put(
            `/api/cards/archive/${cardId}`
         )
         console.log('TRUE ', response.data)
         return response.data
      } catch (error) {
         console.log('ERROOR: ', error)
         return rejectWithValue(error)
      }
   }
)

export const getAllCard = createAsyncThunk(
   'archiveData/put',
   async ({ columnId, boardId }, { rejectWithValue, dispatch }) => {
      console.log('boardId: ', boardId)
      console.log('columnId: ', columnId)
      try {
         const response = await axiosInstance.put(
            `/api/cards/all-archive/${columnId}`
         )
         dispatch(getArchive(boardId))
         console.log('TRUE ', response.data)
         return response.data
      } catch (error) {
         console.log('ERROOR: ', error)
         return rejectWithValue(error)
      }
   }
)
