import { createSlice } from '@reduxjs/toolkit'
import { fetchBoards } from './boardThunk'

export const initialState = {
   board: [],
   status: 'loading',
   title: 'Boardname',
   isFavourite: false,
   background: '#CBCBCB',
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchBoards.fulfilled, (state, actions) => {
         state.board = actions.payload
      })
   },
})

export const { setItems, removeItem } = boardSlice.actions

export default boardSlice.reducer
