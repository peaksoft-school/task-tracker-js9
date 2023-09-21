import { createSlice } from '@reduxjs/toolkit'
import { getNotifications } from './notificationThunk'

export const initialState = {
   notifications: [],
   isloading: false,
}

export const notificationSlice = createSlice({
   name: 'notifications',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getNotifications.fulfilled, (state, actions) => {
         state.notifications = actions.payload
         state.isloading = false
      })
      builder.addCase(getNotifications.pending, (state) => {
         state.isloading = true
      })
      builder.addCase(getNotifications.rejected, (state) => {
         state.isloading = false
      })
   },
})

export const notificationsActions = notificationSlice.actions
