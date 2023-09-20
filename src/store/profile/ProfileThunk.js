import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { axiosFileInstance } from '../../config/axiosFileInstance'

export const profileGetByIdRequest = createAsyncThunk(
   'profile/profileGetByIdRequest',
   async (userId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/profile/${userId}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const profileGetRequest = createAsyncThunk(
   'profile/profileGetRequest',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/profile/me')

         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const profilePutRequest = createAsyncThunk(
   'profile/profilePutRequest',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put('/api/profile', data)

         dispatch(profileGetRequest())

         // eslint-disable-next-line no-restricted-globals
         location.reload()

         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const profileAvatarPutRequest = createAsyncThunk(
   'profile/profileAvatarPutRequest',
   async (avatarUrl, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/profile/avatar?userRequestImage=${avatarUrl}`
         )
         dispatch(profileGetRequest())
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const profileAvatarSThreePost = createAsyncThunk(
   'profile/profileAvatarSThreePost',
   async (avatar, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosFileInstance.post('/api/file', avatar)
         console.log(avatar)

         dispatch(profileAvatarPutRequest(data.Link))
         return data.Link
      } catch (error) {
         throw rejectWithValue(error.message)
      }
   }
)

export const profileAvatarRemoveRequest = createAsyncThunk(
   'profile/profileAvatarRemoveRequest',
   async (avatarLink, { rejectWithValue }) => {
      try {
         await axiosFileInstance.delete('/api/profile', { avatarLink })
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
