/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { workspacesSlice } from './workspace/workspaceSlice'
import { boardSlice } from './board/boardSlice'
import { checkListSlice } from './checkList/CheckListSlice'
import { ProfileSlice } from './profile/ProfileSlice'
import { commentsSlice } from './crud-comments/commentsSlice'
import { favouriteSlice } from './getFavourites/favouritesSlice'
import { cardSlice } from './card/cardSlice'
import { memberSlice } from './inviteMember/memberSlice'
import { labelsSlice } from './getLabels/labelsSlice'
import { partSlice } from './participants/partSlice'
import { columnsSlice } from './column/columnsSlise'
import { archiveSlice } from './getArchive/arichiveSlice'
import { cardsSlice } from './cards/cardsSlice'
import { searchSlice } from './globalSearch/searchSlice'
import { notificationSlice } from './notification/notificationSlice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [checkListSlice.name]: checkListSlice.reducer,
      [ProfileSlice.name]: ProfileSlice.reducer,
      [commentsSlice.name]: commentsSlice.reducer,
      [favouriteSlice.name]: favouriteSlice.reducer,
      [cardSlice.name]: cardSlice.reducer,
      [memberSlice.name]: memberSlice.reducer,
      [labelsSlice.name]: labelsSlice.reducer,
      [partSlice.name]: partSlice.reducer,
      [archiveSlice.name]: archiveSlice.reducer,
      [columnsSlice.name]: columnsSlice.reducer,
      [cardsSlice.name]: cardsSlice.reducer,
      [searchSlice.name]: searchSlice.reducer,
      [notificationSlice.name]: notificationSlice.reducer,
   },
})
