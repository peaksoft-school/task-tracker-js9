import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

import { workspacesSlice } from './workspace/workspaceSlice'

import { boardSlice } from './board/boardSlice'
import { ProfileSlice } from './profile/ProfileSlice'
import { favouriteSlice } from './getFavourites/favouritesSlice'
import { labelsSlice } from './getLabels/labelsSlice'
import { allIssuesSlice } from './get-all-issues/get.all.issuesSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
      [favouriteSlice.name]: favouriteSlice.reducer,
      [labelsSlice.name]: labelsSlice.reducer,
      [allIssuesSlice.name]: allIssuesSlice.reducer,
   },
})
