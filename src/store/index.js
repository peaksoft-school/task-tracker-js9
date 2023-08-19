import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { commentsSlice } from './crud-comments/commentsSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [commentsSlice.name]: commentsSlice.reducer,
   },
})
