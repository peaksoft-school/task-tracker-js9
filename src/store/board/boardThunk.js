import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const fetchBoards = createAsyncThunk(
   'board/fetchBoards',
   async (workSpaceId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/boards/get-all/${42}`)
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
   async (objBoard, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post('/api/boards', objBoard)
         dispatch(fetchBoards())
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const addFavorite = createAsyncThunk(
   'favorite/addFavorite',
   async (boardId, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/favorites/board/${boardId}`)
         dispatch(fetchBoards())
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
