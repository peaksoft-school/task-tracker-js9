import { createSlice } from '@reduxjs/toolkit'
import { fetchBoards, getBoardById } from './boardThunk'

export const initialState = {
   board: [],
   status: 'loading',
   title: 'Boardname',
   favorite: false,
   background: '#CBCBCB',
   boardById: {},
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchBoards.fulfilled, (state, actions) => {
            state.board = actions.payload
         })
         .addCase(getBoardById.fulfilled, (state, actions) => {
            state.boardById = actions.payload
         })
   },
})

export const { setItems, removeItem } = boardSlice.actions

export default boardSlice.reducer
