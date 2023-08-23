import { createSlice } from '@reduxjs/toolkit'
import { checkListGetRequest } from './CheckListThunk'

const initialState = {
   item: [],
   isLoading: false,
}

export const checkListSlice = createSlice({
   name: 'checkList',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(checkListGetRequest.pending, (state) => {
            state.isLoading = true
         })
         .addCase(checkListGetRequest.fulfilled, (state, action) => {
            state.isLoading = true
            state.item = action.payload
         })
         .addCase(checkListGetRequest.rejected, (state) => {
            state.isLoading = false
         })
      // .addCase(checkListPutRequest.fulfilled, (state, action) => {
      //    state.item = action.payload
      //    state.isLoading = false
      // })
   },
})
