import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { boardSlice } from './board/boardSlice'
import { ProfileSlice } from './profile/ProfileSlice'
import { favouriteSlice } from './getFavourites/favouritesSlice'
import { cardSlice } from './card/cardSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
      [favouriteSlice.name]: favouriteSlice.reducer,
      [cardSlice.name]: cardSlice.reducer,
   },
})
