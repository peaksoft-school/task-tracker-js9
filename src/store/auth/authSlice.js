import { createSlice } from '@reduxjs/toolkit'
import { signInRequest, signUpRequest } from './authThunk'
import { AUTH_ROLES } from '../../utils/constants/authRoles'

const initialState = {
   email: '',
   role: AUTH_ROLES.GUEST,
   token: '',
   isAuthorization: false,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(signUpRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.email = actions.payload.email
            state.role = actions.payload.role
            state.token = actions.payload.token
         })
         .addCase(signUpRequest.pending, (state) => {
            state.isAuthorization = false
         })
         .addCase(signUpRequest.rejected, (state) => {
            state.isAuthorization = false
         })

         .addCase(signInRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.email = actions.payload
            state.password = actions.payload
         })
         .addCase(signInRequest.pending, (state) => {
            state.isAuthorization = false
         })
         .addCase(signInRequest.rejected, (state) => {
            state.isAuthorization = false
         })
   },
})

export const authActions = authSlice.actions
