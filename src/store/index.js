import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { workspacesSlice } from './workspace/workspaceSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
   },
})
