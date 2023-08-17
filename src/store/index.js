import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

import { workspacesSlice } from './workspace/workspaceSlice'

import { boardSlice } from './board/boardSlice'
import { ProfileSlice } from './profile/ProfileSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
   },
})
