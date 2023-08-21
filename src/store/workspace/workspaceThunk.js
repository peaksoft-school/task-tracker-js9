import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   // addtoFawotites,
   createWorkspaces,
   deleteWorkspaces,
   getWorkspaces,
   getWorkspacesById,
   updateWorkspacesById,
} from '../../api/workspaceServise'
import { showSnackbar } from '../../components/UI/snackbar/Snackbar'

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
      const { workspaceData, navigate, path } = payload

      try {
         const { data } = await getWorkspacesById(workspaceData.workSpaceId)
         if (navigate) {
            navigate(`/mainPage/${workspaceData.workSpaceId}/${path}`, {
               state: { name: workspaceData.workSpaceName },
            })
         }
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

export const deleteWorkspaceById = createAsyncThunk(
   'workspaces/deleteWorkspaceById',
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await deleteWorkspaces(payload.id)
         if (payload.navigate) {
            payload.navigate('/mainPage')
         }
         showSnackbar({
            message: 'deleted workspace',
            severity: 'success',
         })

         return data
      } catch (error) {
         showSnackbar({
            message: error,
            additionalMessage: 'Please try again .',
            severity: 'error',
         })
         return rejectWithValue(error.data.message)
      }
   }
)
export const updateWorkspace = createAsyncThunk(
   'workspaces/updateWorkspaceById',
   async (
      { workspaceId, name, getWorkspace },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await updateWorkspacesById({
            id: workspaceId,
            name,
         })
         getWorkspace()
         dispatch(fetchAllWorkspaces())
         showSnackbar({
            message: 'updated workspace',
            severity: 'success',
         })
         return data
      } catch (error) {
         showSnackbar({
            message: error,
            additionalMessage: 'Please try again .',
            severity: 'error',
         })
         return rejectWithValue(error.data.message)
      }
   }
)