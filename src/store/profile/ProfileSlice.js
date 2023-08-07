import { createSlice } from '@reduxjs/toolkit'
import { profileGetRequest, profileProjectsRequest } from './ProfileThunk'

const initialState = {
   isLoading: false,
}

export const ProfileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      getFirstNameValue: (state, { payload }) => {
         state.item.firstName = payload
      },
      getLastNameValue: (state, { payload }) => {
         state.item.lastName = payload
      },
      getEmailValue: (state, { payload }) => {
         state.item.email = payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(profileGetRequest.pending, (state) => {
            state.isLoading = true
         })
         .addCase(profileGetRequest.fulfilled, (state, action) => {
            state.item = action.payload
            state.isLoading = false
         })
         .addCase(profileGetRequest.rejected, (state) => {
            state.isLoading = false
         })
         .addCase(profileProjectsRequest.pending, (state) => {
            state.isLoading = true
         })
         .addCase(profileProjectsRequest.fulfilled, (state, action) => {
            state.item = action.payload
            state.isLoading = false
         })
         .addCase(profileProjectsRequest.rejected, (state) => {
            state.isLoading = false
         })
   },
})

export const ProfileActions = ProfileSlice.actions
