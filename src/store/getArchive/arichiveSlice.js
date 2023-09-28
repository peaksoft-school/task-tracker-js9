import { createSlice } from '@reduxjs/toolkit'
import { getArchive } from './archiveThunk'

const initialState = {
   archive: [],
}

export const archiveSlice = createSlice({
   name: 'archiveData',
   initialState,
   reducers: {},
   extraReducers: (builder) => [
      builder.addCase(getArchive.fulfilled, (state, action) => {
         state.archive = action.payload
      }),
   ],
})
export const favouriteActions = archiveSlice.actions
