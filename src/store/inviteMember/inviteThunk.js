import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const allinviteMember = createAsyncThunk(
   'board-invite/inviteGet',
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
   'bord-invite/invitePost',
   async (newdata, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/members/board-invite${newdata}`
         )
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
