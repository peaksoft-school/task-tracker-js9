import { createAction } from '@reduxjs/toolkit'

const initialState = {
   title: '',
   description: '',
}

export const cardSlice = createAction({
   name: 'card',
   initialState,
   reducer: {},
})
