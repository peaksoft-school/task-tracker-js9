import { createSlice } from '@reduxjs/toolkit'
import { allinviteMember } from './inviteThunk'

export const memberSlice = createSlice({
   name: 'inviteMember',
   inntialState: {
      inviteMember: [],
      loading: false,
   },
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(allinviteMember.fulfilled, (state, action) => {
         state.loading = action.payload
      }),
   ],
})
export const inviteActions = memberSlice.actions
