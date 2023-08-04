import { createSlice } from '@reduxjs/toolkit'
import { signInRequest, signUpRequest } from './authThunk'
import { STORAGE_KEY, USER_ROLE } from '../../utils/constants/authorization'
// import { AUTH_ROLES } from '../../utils/constants/authRoles'

const getInitialState = () => {
   const json = localStorage.getItem(STORAGE_KEY.AUTH_KEY)

   if (json) {
      const userData = JSON.parse(json)
      console.log('userData: ', userData)

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
   }
}

const initialState = getInitialState()

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(signUpRequest.fulfilled, (state, actions) => {
            state.isAuthorization = true
            state.isLoading = false
            state.email = actions.payload.email
            state.name = actions.payload.name
            state.role = actions.payload.role
            state.token = actions.payload.token
         })
         .addCase(signUpRequest.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(signUpRequest.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })

         .addCase(signInRequest.fulfilled, (state, actions) => {
            console.log('actions: ', actions.payload)
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
         .addCase(signInRequest.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })
   },
})

export const authActions = authSlice.actions
