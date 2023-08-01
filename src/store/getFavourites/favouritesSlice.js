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
         // eslint-disable-next-line no-param-reassign
         state.favorite = action.payload
      }),
   ],
})
