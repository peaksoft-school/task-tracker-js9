import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   addtoFawotites,
   createWorkspaces,
   getWorkspaces,
   getWorkspacesById,
} from '../../api/workspaceServise'

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
   async (payload, { rejectWithValue }) => {
      const { id, navigate, path } = payload
      console.log(payload, 'ssssss')
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
export const createNewWorkspace = createAsyncThunk(
   'workspaces/newWorkspace',
   async (newdata, { rejectWithValue, dispatch }) => {
      try {
         const data = await createWorkspaces(newdata)
         dispatch(fetchAllWorkspaces())
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)

export const addtoFaworitesWorkspaces = createAsyncThunk(
   'workspaces/faworites',
   async (payload, { rejectWithValue }) => {
      const { dispatch, id } = payload
      try {
         const data = await addtoFawotites(id)
         dispatch(fetchAllWorkspaces())
         return data
      } catch (error) {
         return rejectWithValue(error.data.message)
      }
   }
)
