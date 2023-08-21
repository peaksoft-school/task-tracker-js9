import { createSlice } from '@reduxjs/toolkit'
import { getLabels } from './labelsThunk'

const initialState = {
   label: [],
}

export const labelsSlice = createSlice({
   name: 'labels',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getLabels.fulfilled, (state, action) => {
         state.label = action.payload
      })
   },
})
