import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showSnackbar } from '../../components/UI/snackbar/Snackbar'

export const allinviteMember = createAsyncThunk(
   'inviteMember/inviteGet',
   async (boardId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/members/boards-members/${boardId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const createInviteMember = createAsyncThunk(
   'inviteMember/invitePost',
   async (
      { newdata, boardId, openInviteNewModal },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/members/board-invite`,
            newdata
         )
         dispatch(allinviteMember(boardId))
         showSnackbar({
            message: 'Invited member',
            severity: 'success',
         })
         dispatch(openInviteNewModal())

         return data
      } catch (error) {
         showSnackbar({
            message: error.response.data.message,
            severity: 'error',
         })
         return rejectWithValue(error)
      }
   }
)
export const updateRoles = createAsyncThunk(
   'inviteMember/updateRolesById',
   async ({ memberId, role, boardId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.put(`api/members/change-role`, {
            memberId,
            boardId,
            role,
         })
         dispatch(allinviteMember(boardId))

         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
