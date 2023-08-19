import { createSlice } from '@reduxjs/toolkit'
import { deleteComment, getAllComments, postComments } from './commentsThunk'

const initialState = {
   comments: [],
   isLoading: false,
   isError: '',
}

export const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      updateComment: (state, action) => {
         const { commentId, newText } = action.payload
         const commentToUpdate = state.comments.find(
            (comment) => comment.commentId === commentId
         )

         if (commentToUpdate) {
            commentToUpdate.comment = newText
         }
      },
   },
   extraReducers: (builder) => {
      builder
         // get all comments
         .addCase(getAllComments.fulfilled, (state, action) => {
            state.comments = action.payload
            state.isLoading = false
            state.isError = ''
         })
         .addCase(getAllComments.pending, (state) => {
            state.comments = []
            state.isLoading = true
            state.isError = ''
         })
         .addCase(getAllComments.rejected, (state, action) => {
            state.comments = []
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
         .addCase(deleteComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = state.comments.filter(
               (comment) => comment.id !== action.payload
            )
         })
         .addCase(deleteComment.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
         })
   },
})

export const { updateComment } = commentsSlice.actions
