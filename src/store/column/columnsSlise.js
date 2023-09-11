import { createSlice } from '@reduxjs/toolkit'
import { getColumns } from './columnsThunk'

const initialState = {
   columnsData: [],
}
export const columnsSlice = createSlice({
   name: 'columns',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(getColumns.fulfilled, (state, action) => {
         state.columnsData = action.payload
      }),
   ],
})
export const columnsActions = columnsSlice.actions
