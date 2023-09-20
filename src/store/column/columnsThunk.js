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
      console.log('newData', newdata)
      try {
         const response = await axiosInstance.post(`api/column`, newdata)
         dispatch(getColumns(+boardId))
         console.log('response: ', response)
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
   'columns/updateWorkspaceById',
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
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `api/column/archive/${data.columnId}`
         )
         dispatch(getColumns(data.boardId))
         console.log('data: ', response)

         return response.data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
