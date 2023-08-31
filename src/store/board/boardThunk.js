import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showSnackbar } from '../../components/UI/snackbar/Snackbar'

export const fetchBoards = createAsyncThunk(
   'board/fetchBoards',
   async (workSpaceId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/boards/get-all/${workSpaceId}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const getBoardById = createAsyncThunk(
   'board/getBoardById',
   async (boardId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/boards/${boardId}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const boardRemove = createAsyncThunk(
   'board/boardRemove',
   async (
      { boardId, showSnackbar, navigate, id },
      { dispatch, rejectWithValue }
   ) => {
      try {
         await axiosInstance.delete(`/api/boards/${boardId}`)
         dispatch(fetchBoards())
         showSnackbar({
            message: 'Successfully deleted',
            severity: 'success',
         })
         navigate(`/mainPage/${id}/boards`)
      } catch (error) {
         showSnackbar({
            message: 'error deleting',
            severity: 'error',
         })
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
         showSnackbar({
            message: 'Successfully',
            severity: 'success',
         })
      } catch (error) {
         showSnackbar({
            message: error.response.data.message,
            severity: 'error',
         })
         return rejectWithValue(error)
      }
   }
)

export const addFavorite = createAsyncThunk(
   'favorite/addFavorite',
   async ({ boardId, workSpaceId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/favorites/board/${boardId}`)
         dispatch(fetchBoards(workSpaceId))
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const updateBord = createAsyncThunk(
   'board/updateBord',
   async ({ data, boardId }, { rejectWithValue, dispatch }) => {
      console.log('data: ', data)
      // if (!data.backGround) {
      //    delete data.backGround
      // }
      try {
         await axiosInstance.put(`/api/boards`, data)
         dispatch(getBoardById(boardId))
         showSnackbar({
            message: 'Successfully updated board',
            severity: 'success',
         })
      } catch (error) {
         showSnackbar({
            message: 'Error updating board',
            severity: 'error',
         })
         return rejectWithValue(error)
      }
   }
)
