import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllIssues = createAsyncThunk(
   'allIssues/getAllIssues',
   async (workspaceId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/all-issues/filter?workSpaceId=${workspaceId}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(rejectWithValue(error.response.data))
      }
   }
)

// export const getAllIssues = createAsyncThunk(
//    'allIssues/getAllIssues',
//    async (workspaceId, { rejectWithValue }) => {
//       try {
//          const response = await axiosFileInstance.get(
//             `/all-issues/filter/${workspaceId}`
//          )
//          return response.data
//       } catch (error) {
//          return rejectWithValue(
//             error?.response?.data  'Something went wrong!'
//          )
//       }
//    }
// )
