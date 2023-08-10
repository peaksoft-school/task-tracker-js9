import { createSlice } from '@reduxjs/toolkit'
import { getFavourites } from './favouritesThunk'

const initialState = {
   favorite: [],
}
export const favouriteSlice = createSlice({
   name: 'favourite',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(getFavourites.fulfilled, (state, action) => {
         console.log('action: ', action.payload)
         state.favorite = action.payload
      }),
   ],
})
