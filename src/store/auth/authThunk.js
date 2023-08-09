import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { STORAGE_KEY } from '../../utils/constants/authorization'

// РЕГИСТРАЦИЯ
export const signUpRequest = createAsyncThunk(
   'auth/signUp',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/auth/signUp', data)
         localStorage.setItem(
            STORAGE_KEY.TASK_TRACER_AUTH_KEY,
            JSON.stringify(response.data)
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)

// ВОЙТИ
export const signInRequest = createAsyncThunk(
   'auth/signIn',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/auth/signIn', payload)

         localStorage.setItem(
            STORAGE_KEY.TASK_TRACER_AUTH_KEY,
            JSON.stringify(response.data)
         )

         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)

// AUTH WITH GOOGLE

export const authWithGoogleRequest = createAsyncThunk(
   'auth/authWithGoogle',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/google?tokenId=${payload}`
         )

         localStorage.setItem(
            STORAGE_KEY.TASK_TRACER_AUTH_KEY,
            JSON.stringify(response.data)
         )

         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)

// FORGOT PASSWORD

export const forgotPasswordRequest = createAsyncThunk(
   'auth/forgotPassword',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/forgot-password?email=${data.email}&link=${data.link}`
         )

         return response
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)

// RESET PASSWORD

export const resetPasswordRequest = createAsyncThunk(
   'auth/forgotPassword',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(`/auth/reset-password`, data)

         return response
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)
