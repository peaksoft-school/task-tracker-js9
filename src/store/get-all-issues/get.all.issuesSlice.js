import { createSlice } from '@reduxjs/toolkit'
import { getAllIssues } from './get.all.issuesThunk'

const initialState = {
   isLoading: false,
   allIssues: [],
   isError: '',
}

export const allIssuesSlice = createSlice({
   name: 'allIssues',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllIssues.fulfilled, (state, action) => {
            state.isLoading = false
            state.allIssues = action.payload

            state.isError = ''
         })

         .addCase(getAllIssues.pending, (state) => {
            state.isLoading = true
            state.isError = ''
         })
         .addCase(getAllIssues.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload
         })
   },
})
