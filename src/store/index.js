import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { ProfileSlice } from './profile/ProfileSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
   },
})
