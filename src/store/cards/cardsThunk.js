import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { getColumns } from '../column/columnsThunk'

export const getAllCards = createAsyncThunk(
   'card/cardGetAll',
   async (columnId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/cards/column-cards/${columnId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const createNewCard = createAsyncThunk(
   'card/newColumn',
   async (newCard, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(`/api/cards`, newCard)
         dispatch(getColumns(newCard.boardId))
         return response
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)

export const getCardbyId = createAsyncThunk(
   'card/getById',
   async ({ cardId }, { rejectWithValue }) => {
      try {
         console.log(cardId, 'cardId in thunk ')
         const { data } = await axiosInstance.get(`/api/cards/${cardId}`)
         console.log(data, 'data in thunk cardID')
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const deleteCardbyColumnId = createAsyncThunk(
   'card/deleteCardsByColumnId',
   async ({ columnId, boardId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/cards/all/${columnId}`
         )
         dispatch(getColumns(boardId))
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const deleteCardbyCardId = createAsyncThunk(
   'card/deleteCardsByCardId',
   async ({ cardId, boardId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(`/api/cards/${cardId}`)
         dispatch(getColumns(boardId))
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
