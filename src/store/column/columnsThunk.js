import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getColumns = createAsyncThunk(
   'columns/columnGet',
   async (boardId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/column/${boardId}`)
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const createNewColumn = createAsyncThunk(
   'columns/newColumn',
   async ({ newdata, boardId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(`api/column`, newdata)
         dispatch(getColumns(+boardId))

         return response
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const deleteColumnById = createAsyncThunk(
   'columns/deleteColumn',
   async ({ boardId, columnId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(`/api/column/${columnId}`)
         dispatch(getColumns(boardId))
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const updateColumnTitle = createAsyncThunk(
   'columns/updateColumnTitleById',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/column/${data.columnId}`,
            {
               boardId: data.boardId,
               title: data.title,
            }
         )
         dispatch(getColumns(data.boardId))
         return response.data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const addColumnsToArchive = createAsyncThunk(
   'columns/addtoArhive',
   async ({ data, boardId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `api/column/archive/${data.columnId}`
         )
         dispatch(getColumns(boardId))
         console.log('data: ', response)

         return response.data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
