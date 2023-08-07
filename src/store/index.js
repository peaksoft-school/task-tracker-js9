import { configureStore } from '@reduxjs/toolkit'
import { ProfileSlice } from './profile/ProfileSlice'

export const store = configureStore({
   reducer: {
      [ProfileSlice.name]: ProfileSlice.reducer,
   },
})
