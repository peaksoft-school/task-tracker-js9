import { createSlice } from '@reduxjs/toolkit'
import { getAllIssues } from './get.all.issuesThunk'

const initialState = {
   isLoading: false,
   isChecked: false,
   // memberSearch: [],
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
            state.isChecked = action.isChecked
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
      // search
      // .addCase(getSearchMembers.fulfilled, (state, actions) => {
      //    state.memberSearch = actions.payload
      //    state.isLoading = false
      // })
      // .addCase(getSearchMembers.pending, (state) => {
      //    state.isLoading = true
      // })
      // .addCase(getSearchMembers.rejected, (state) => {
      //    state.isLoading = false
      // })
   },
})
