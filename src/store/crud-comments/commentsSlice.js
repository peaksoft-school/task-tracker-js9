import { createSlice } from '@reduxjs/toolkit'
import { getAllComments, postComments, deleteComment } from './commentsThunk'

const initialState = {
   comments: [],
   isLoading: false,
   isError: '',
   isMyComment: false,
}

export const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         // get all comments
         .addCase(getAllComments.fulfilled, (state, action) => {
            state.comments = action.payload
            state.isLoading = false
            state.isError = ''
            state.isMyComment = action.payload.isMyComment
         })
         .addCase(getAllComments.pending, (state) => {
            state.isLoading = true
            state.isError = ''
         })
         .addCase(getAllComments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
         })
         // add comments
         .addCase(postComments.pending, (state) => {
            state.isLoading = true
            state.isError = ''
         })
         .addCase(postComments.fulfilled, (state) => {
            state.isLoading = false
            state.isError = ''
         })

         .addCase(postComments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
         })
         // delete comments
         .addCase(deleteComment.pending, (state) => {
            state.isLoading = true
            state.isError = null
         })
         .addCase(deleteComment.fulfilled, (state) => {
            state.isLoading = false
         })
         .addCase(deleteComment.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
         })
   },
})
