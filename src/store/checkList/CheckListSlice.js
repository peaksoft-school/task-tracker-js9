import { createSlice } from '@reduxjs/toolkit'
import { checkListGetRequest } from './CheckListThunk'

const initialState = {
   checkListData: [],
   itemObject: {},
   isLoading: false,
   items: [],
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
            state.checkListData = action.payload
         })
         .addCase(checkListGetRequest.rejected, (state) => {
            state.isLoading = false
         })
   },
})
