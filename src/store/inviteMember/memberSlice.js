import { createSlice } from '@reduxjs/toolkit'
import { allinviteMember } from './inviteThunk'

const initialState = {
   inviteMember: [],
   loading: false,
}

export const memberSlice = createSlice({
   name: 'inviteMember',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(allinviteMember.fulfilled, (state, action) => {
         state.inviteMember = action.payload
      }),
   ],
})
export const inviteActions = memberSlice.actions
