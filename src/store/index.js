/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './slice/boardSlice'

export const store = configureStore({
   reducer: {
      boardSlice,
   },
})
