import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { boardSlice } from './board/boardSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
   },
})
