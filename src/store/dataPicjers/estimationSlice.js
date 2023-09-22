import { createSlice } from '@reduxjs/toolkit'
import { estimationPostRequest } from './estimationThunk'

const initialState = {
   id: null,
   mode: false,
   formatData: '',
}

export const estimationSlice = createSlice({
   name: 'estimations',
   initialState,
   reducers: {
      setFormatData: (state) => {
         state.formatData = 'false'
      },
   },
   extraReducers: (builder) => {
      builder.addCase(estimationPostRequest.fulfilled, (state, action) => {
         state.id = action.payload
      })
   },
})

export const { setMode, setFormatData } = estimationSlice.actions
