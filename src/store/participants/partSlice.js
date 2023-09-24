import { createSlice } from '@reduxjs/toolkit'
import { fetchParticipans } from './partThunk'

export const initialState = {
   participants: [],
}

export const partSlice = createSlice({
   name: 'participant',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchParticipans.fulfilled, (state, actions) => {
         state.participants = actions.payload
      })
   },
})
