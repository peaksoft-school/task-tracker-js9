import { createSlice } from '@reduxjs/toolkit'
import { fetchAllWorkspaces, getWorkspacebyId } from './workspaceThunk'

export const workspacesSlice = createSlice({
   name: 'workspaces',
   initialState: {
      workspaces: [],
      workspaceById: {},
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
      [getWorkspacebyId.fulfilled]: (state, actions) => {
         state.workspaceById = actions.payload
      },
   },
})

export const workspacesActions = workspacesSlice.actions
