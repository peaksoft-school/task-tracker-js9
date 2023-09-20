import { createSlice } from '@reduxjs/toolkit'
import { getAllCards } from './cardsThunk'

const initialState = {
   cardsData: [],
}

export const cardsSlice = createSlice({
   name: 'cards',
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      builder.addCase(getAllCards.fulfilled, (state, actions) => {
         state.cardsData = actions.payload
      })
   },
})

export default cardsSlice.actions
