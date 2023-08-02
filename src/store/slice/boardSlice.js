import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
   const { data } = await axios.get(`http://localhost:3001/boards/`)

   return data
})

export const boardRemove = createAsyncThunk(
   'board/boardRemove',
   async (id, { dispatch }) => {
      console.log(dispatch)
      axios.delete(`http://localhost:3001/boards/${id}`)
      dispatch(fetchBoards())
   }
)
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
      removeItem(state, action) {
         state.items = state.items.filter((obj) => obj.id !== action.payload)
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

export const { setItems, removeItem } = boardSlice.actions

export default boardSlice.reducer
