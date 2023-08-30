import { createSlice } from '@reduxjs/toolkit'
import { attachmentGet, attachmentPhotoPost } from './cardThunk'

const initialState = {
   images: [],
   documentLink: '',
}

export const cardSlice = createSlice({
   name: 'card',
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      builder
         .addCase(attachmentGet.fulfilled, (state, actions) => {
            state.images = actions.payload
         })
         .addCase(attachmentPhotoPost.fulfilled, (state, actions) => {
            state.documentLink = actions.payload
         })
   },
})

export default cardSlice.actions
