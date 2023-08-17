import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const fetchBoards = createAsyncThunk(
   'board/fetchBoards',
   async (workSpaceId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/boards/get-all/${49}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const boardRemove = createAsyncThunk(
   'board/boardRemove',
   async (boardId, { dispatch, rejectWithValue }) => {
      try {
         await axiosInstance.delete(`/api/boards/${boardId}`)
         dispatch(fetchBoards())
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const boardPost = createAsyncThunk(
   'board/boardPost',
   async ({ objBoard, workSpaceId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post('/api/boards', objBoard)
         dispatch(fetchBoards(workSpaceId))
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const addFavorite = createAsyncThunk(
   'favorite/addFavorite',
   async ({ boardId, workSpaceId }, { rejectWithValue, dispatch }) => {
      console.log('boardId', boardId)
      try {
         await axiosInstance.post(`/api/favorites/board/${boardId}`)
         dispatch(fetchBoards(workSpaceId))
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
