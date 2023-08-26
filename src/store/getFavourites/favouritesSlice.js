import { createSlice } from '@reduxjs/toolkit'
import { getFavourites } from './favouritesThunk'

const initialState = {
   favoriteData: [],
}
export const favouriteSlice = createSlice({
   name: 'favorite',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(getFavourites.fulfilled, (state, action) => {
         state.favoriteData = action.payload
      }),
   ],
})
export const favouriteActions = favouriteSlice.actions
