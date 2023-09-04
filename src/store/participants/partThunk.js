import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const fetchParticipans = createAsyncThunk(
   'participant/participantsGet',
   async ({ partId, role }, { rejectWithValue }) => {
      console.log(role, 'role')
      try {
         const response = await axiosInstance.get(
            `/api/participants/${partId}?role=${role}`
         )
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const postParticipans = createAsyncThunk(
   'participant/participantsPost',
   async (partId, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/participants`, partId)
         dispatch(
            fetchParticipans({
               partId: partId.workSpacesId,
               role: 'ALL',
            })
         )
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
export const putParticipans = createAsyncThunk(
   'participant/Putparticipants',
   async ({ memberId, workSpacesId, role }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(`/api/participants`, {
            memberId,
            workSpacesId,
            role,
         })
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
         dispatch(fetchParticipans({ partId: workSpacesId, role }))
         return response.data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
