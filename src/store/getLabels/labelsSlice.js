import { createSlice } from '@reduxjs/toolkit'
import { getAllLabelByCardId, getLabels } from './labelsThunk'

const initialState = {
   label: [],
   labelByCardId: [],
}

export const labelsSlice = createSlice({
   name: 'labels',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getLabels.fulfilled, (state, action) => {
            state.label = action.payload
         })
         // .addCase(postLabel.fulfilled, (state, action) => {
         //    const { description, color } = action.payload
         //    state.label.push({ description, color })
         // })
         .addCase(getAllLabelByCardId.fulfilled, (state, action) => {
            state.labelByCardId = action.payload
         })
   },
})
