import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllIssues = createAsyncThunk(
   'allIssues/getAllIssues',
   async ({ id, filterParams }, { rejectWithValue }) => {
      console.log('filterParams: ', filterParams)
      try {
         const response = await axiosInstance.get(
            `/all-issues/filter?workSpaceId=${id}`,
            {
               params: filterParams,
            }
         )
         console.log('response: ', response)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
