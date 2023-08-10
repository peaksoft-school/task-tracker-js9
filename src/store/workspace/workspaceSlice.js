import { createSlice } from '@reduxjs/toolkit'
import { fetchAllWorkspaces } from './workspaceThunk'

export const workspacesSlice = createSlice({
   name: 'workspaces',
   initialState: {
      workspaces: [],
      loading: false,
   },
   reducers: {},
   extraReducers: {
      [fetchAllWorkspaces.pending]: (state) => {
         state.loading = true
      },
      [fetchAllWorkspaces.fulfilled]: (state, action) => {
         state.workspaces = action.payload
         state.loading = false
      },
      [fetchAllWorkspaces.rejected]: (state) => {
         state.loading = false
      },
   },
})

export const workspacesActions = workspacesSlice.actions
