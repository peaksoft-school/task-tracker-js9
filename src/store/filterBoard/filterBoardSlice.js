import { createSlice } from '@reduxjs/toolkit'
import { getBoardFilter } from './filterBoardThunk'

const initialState = {
   isChecked: false,
}

export const boardFilterSlice = createSlice({
   name: 'boardFilter',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getBoardFilter.fulfilled, (state, action) => {
         console.log('action: ', action)
         state.isChecked = action.isChecked
      })
   },
})
