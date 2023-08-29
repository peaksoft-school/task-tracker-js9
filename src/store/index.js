import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

import { workspacesSlice } from './workspace/workspaceSlice'

import { boardSlice } from './board/boardSlice'
import { ProfileSlice } from './profile/ProfileSlice'
import { favouriteSlice } from './getFavourites/favouritesSlice'
import { cardSlice } from './card/cardSlice'
import { labelsSlice } from './getLabels/labelsSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
      [favouriteSlice.name]: favouriteSlice.reducer,
      [cardSlice.name]: cardSlice.reducer,
      [labelsSlice.name]: labelsSlice.reducer,
   },
})
