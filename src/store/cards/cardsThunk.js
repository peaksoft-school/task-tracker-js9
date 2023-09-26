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
         const { data } = await axiosInstance.get(`/api/cards/${cardId}`)
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)

export const moveCard = createAsyncThunk(
   'card/moveCard',
   async (card, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/cards/move-card/${card.data.cardId}/${card.data.columnId}`
         )

         dispatch(getColumns(card.boardId))

         return response.data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
