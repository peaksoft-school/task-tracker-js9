import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { workspacesSlice } from './workspace/workspaceSlice'
import { boardSlice } from './board/boardSlice'
import { ProfileSlice } from './profile/ProfileSlice'
import { commentsSlice } from './crud-comments/commentsSlice'
import { favouriteSlice } from './getFavourites/favouritesSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
      [commentsSlice.name]: commentsSlice.reducer,
      [favouriteSlice.name]: favouriteSlice.reducer,
   },
})
