import { createAsyncThunk } from '@reduxjs/toolkit'
import { getWorkspaces } from '../../api/workspaceServise'

export const fetchAllWorkspaces = createAsyncThunk(
   ' api/work_spaces',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await getWorkspaces()
         return data.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)
