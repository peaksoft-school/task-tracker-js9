import { createAsyncThunk } from '@reduxjs/toolkit'
import { getWorkspaces, getWorkspacesById } from '../../api/workspaceServise'

export const fetchAllWorkspaces = createAsyncThunk(
   'workspaces/work_spaces',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await getWorkspaces()
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
export const getWorkspacebyId = createAsyncThunk(
   'workspaces/getById',
   async (value, { rejectWithValue }) => {
      const { id, navigate, path } = value
      console.log(value, 'ssssss')
      try {
         const { data } = await getWorkspacesById(id)
         if (navigate) {
            navigate(`/mainPage/${id}/${path}`)
         }
         console.log('data:', data)
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
