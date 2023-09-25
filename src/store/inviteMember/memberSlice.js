import { createSlice } from '@reduxjs/toolkit'
import { allinviteMember, createInviteMember } from './inviteThunk'

const initialState = {
   inviteMember: [],
   loading: false,
}

export const memberSlice = createSlice({
   name: 'inviteMember',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder
         .addCase(allinviteMember.fulfilled, (state, action) => {
            state.inviteMember = action.payload
         })
         .addCase(createInviteMember.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createInviteMember.pending, (state) => {
            state.loading = true
         })
         .addCase(createInviteMember.rejected, (state) => {
            state.loading = false
         }),
   ],
})
export const inviteActions = memberSlice.actions
