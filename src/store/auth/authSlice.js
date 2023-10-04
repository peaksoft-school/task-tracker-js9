import { createSlice } from '@reduxjs/toolkit'
import {
   authWithGoogleRequest,
   forgotPasswordRequest,
   resetPasswordRequest,
   signInRequest,
   signUpRequest,
} from './authThunk'
import { STORAGE_KEY, USER_ROLE } from '../../utils/constants/authorization'

const getInitialState = () => {
   const json = localStorage.getItem(STORAGE_KEY.TASK_TRACER_AUTH_KEY)

   if (json) {
      const userData = JSON.parse(json)

      return {
         isAuthorization: true,
         token: userData.token,
         email: userData.email,
         role: userData.role,
      }
   }

   return {
      isAuthorization: false,
      isLoading: false,
      token: '',
      email: '',
      name: '',
      role: USER_ROLE.GUEST,
      isError: '',
   }
}

const initialState = getInitialState()

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // регистрация
      builder
         .addCase(signUpRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.isLoading = false
            state.email = actions.payload.email
            state.role = actions.payload.role
            state.token = actions.payload.token
         })
         .addCase(signUpRequest.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(signUpRequest.rejected, (state, actions) => {
            state.isAuthorization = false
            state.isLoading = false
            state.isError = actions.error
         })
         //  войти
         .addCase(signInRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.isLoading = false
            state.email = actions.payload.email
            state.token = actions.payload.token
            state.role = actions.payload.role
         })
         .addCase(signInRequest.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(signInRequest.rejected, (state, actions) => {
            state.isAuthorization = false
            state.isLoading = false
            state.isError = actions.error
         })
         // auth with google
         .addCase(authWithGoogleRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.isLoading = false
            state.token = actions.payload.token
            state.email = actions.payload.email
            state.role = actions.payload.role
         })
         .addCase(authWithGoogleRequest.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(authWithGoogleRequest.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })
         // forgot password
         .addCase(forgotPasswordRequest.fulfilled, (state) => {
            state.isAuthorization = true
            state.isLoading = false
         })
         .addCase(forgotPasswordRequest.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(forgotPasswordRequest.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })
         // reset password
         .addCase(resetPasswordRequest.fulfilled, (state) => {
            state.isAuthorization = true
            state.isLoading = false
            // state.email = actions.payload.email
            // state.token = actions.payload.token
            // state.role = actions.payload.role
         })
   },
})

export const authActions = authSlice.actions
