import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showSnackbar } from '../../components/UI/snackbar/Snackbar'

export const fetchParticipans = createAsyncThunk(
   'participant/participantsGet',
   async ({ id, role }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/participants/${id}?role=${role}`
         )
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const postParticipans = createAsyncThunk(
   'participant/participantsPost',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/participants`, id)
         dispatch(
            fetchParticipans({
               id: id.workSpacesId,
               role: 'ALL',
            })
         )
         showSnackbar({
            message: 'Successfully',
            severity: 'success',
         })
      } catch (err) {
         showSnackbar({
            message: err.response.data.message,
            severity: 'error',
         })
         return rejectWithValue(err)
      }
   }
)
export const putParticipans = createAsyncThunk(
   'participant/Putparticipants',
   async ({ memberId, workSpacesId, role }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(`/api/participants`, {
            memberId,
            workSpacesId,
            role,
         })
         dispatch(
            fetchParticipans({
               id: workSpacesId,
               role: 'ALL',
            })
         )
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
export const removeParticipants = createAsyncThunk(
   'participant/participantsRemove',
   async ({ workSpacesId, userId, role }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/participants/${workSpacesId}/${userId}`
         )
         dispatch(fetchParticipans({ id: workSpacesId, role }))
         showSnackbar({
            message: 'Successfully deleted',
            severity: 'success',
         })
         return response.data
      } catch (err) {
         showSnackbar({
            message: 'error deleting',
            severity: 'error',
         })
         return rejectWithValue(err)
      }
   }
)
