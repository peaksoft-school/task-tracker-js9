import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

// РЕГИСТРАЦИЯ
export const signUpRequest = createAsyncThunk(
   'auth/signUp',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/auth/signUp', data)

         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

// ВОЙТИ
export const signInRequest = createAsyncThunk(
   'auth/signIn',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/auth/signIn', payload)

         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

// FORGOT PASSWORD

export const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/forgot-password?email=${data.email}&link=${data.link}`
         )
         console.log('response: ', response)

         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
