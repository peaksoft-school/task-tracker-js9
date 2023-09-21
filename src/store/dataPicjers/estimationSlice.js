import { createSlice } from '@reduxjs/toolkit'
import { estimationPostRequest } from './estimationThunk'

const initialState = {
   estimationData: [],
   isUpdate: false, // Добавляем булевое состояние
}

export const estimationSlice = createSlice({
   name: 'estimation',
   initialState,
   reducers: {
      toggleUpdateMode: (state) => {
         // Инвертируем булевое состояние isUpdate
         state.isUpdate = !state.isUpdate
      },
   },
   extraReducers: (builder) => {
      builder.addCase(estimationPostRequest.fulfilled, (state, action) => {
         state.estimationData = action.payload
      })
   },
})

export const { toggleUpdateMode } = estimationSlice.actions

export default estimationSlice.reducer
