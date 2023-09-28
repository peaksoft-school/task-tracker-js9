import { createSlice } from '@reduxjs/toolkit'
import { getAllCards, getCardbyId } from './cardsThunk'

const initialState = {
   cardsData: [],
   cardById: {},
}

export const cardsSlice = createSlice({
   name: 'cards',
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllCards.fulfilled, (state, actions) => {
            state.cardsData = actions.payload
         })

         .addCase(getCardbyId.fulfilled, (state, action) => {
            state.cardById = action.payload
         })
   },
})

export default cardsSlice.actions
