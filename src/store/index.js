import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { boardSlice } from './board/boardSlice'
import { commentsSlice } from './crud-comments/commentsSlice'
import { ProfileSlice } from './profile/ProfileSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [commentsSlice.name]: commentsSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
   },
})
