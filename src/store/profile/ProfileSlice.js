import { createSlice } from '@reduxjs/toolkit'
import {
   profileAvatarSThreePost,
   profileGetByIdRequest,
   profileGetRequest,
} from './ProfileThunk'

const initialState = {
   isLoading: false,
   avatarLink: '',
   item: {},
   getItemById: {},
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
            state.avatarLink = action.payload.avatar
            state.isLoading = false
         })
         .addCase(profileGetByIdRequest.fulfilled, (state, action) => {
            state.getItemById = action.payload
            state.avatarLink = action.payload.avatar
            state.isLoading = false
         })

         .addCase(profileGetRequest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(profileAvatarSThreePost.pending, (state) => {
            state.isLoading = true
         })

         .addCase(profileAvatarSThreePost.fulfilled, (state, action) => {
            state.avatarLink = action.payload
            state.isLoading = false
         })
         .addCase(profileAvatarSThreePost.rejected, (state) => {
            state.isLoading = false
         })
   },
})

export const ProfileActions = ProfileSlice.actions
