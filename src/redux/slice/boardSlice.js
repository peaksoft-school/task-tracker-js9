import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
   const { data } = await axios.get(
      `http://tasktracker.peaksoftprojects.com/boards/`
   )
   return data
})

export const initialState = {
   items: [],
   status: 'loading',
   title: 'Boardname',
   isFavourite: false,
   background: '#CBCBCB',
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload
      },
   },
   extraReducers: {
      [fetchBoards.pending]: (state) => {
         state.status = 'loading'
         state.items = []
      },
      [fetchBoards.fulfilled]: (state, action) => {
         state.items = action.payload
         state.status = 'succes'
      },
      [fetchBoards.rejected]: (state) => {
         state.status = 'error'
         state.item = []
      },
   },
})

export const { setItems } = boardSlice.actions

export default boardSlice.reducer
