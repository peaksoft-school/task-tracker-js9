import { createSlice } from '@reduxjs/toolkit'
import { searchRequest } from './searchThunk'

const initialState = {
   globalSearch: {},
   loading: false,
   searchHistory: [],
   searchHistoryWorkspace: [],
   searchHistoryUser: [],
}

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      addToSearchHistory: (state, action) => {
         state.searchHistory.unshift(action.payload)
      },
      addToSearchHistoryWorkspace: (state, action) => {
         state.searchHistoryWorkspace.unshift(action.payload)
      },
      addToSearchHistoryUser: (state, action) => {
         state.searchHistoryUser.unshift(action.payload)
      },
   },
   extraReducers: (builder) => {
      builder.addCase(searchRequest.fulfilled, (state, actions) => {
         state.globalSearch = actions.payload
         state.loading = false
      })
      builder.addCase(searchRequest.pending, (state) => {
         state.loading = true
      })
      builder.addCase(searchRequest.rejected, (state) => {
         state.loading = false
      })
   },
})

export const {
   addToSearchHistory,
   addToSearchHistoryWorkspace,
   addToSearchHistoryUser,
} = searchSlice.actions
