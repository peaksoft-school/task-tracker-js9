import { configureStore } from '@reduxjs/toolkit'
import { favouriteSlice } from './getFavourites/favouritesSlice'

export const store = configureStore({
   reducer: {
      [favouriteSlice.name]: favouriteSlice.reducer,
   },
})
