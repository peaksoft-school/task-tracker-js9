import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllIssues = createAsyncThunk(
   'allIssues/getAllIssues',
   async ({ filterParams, assignee, id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            // `/all-issues/filter?workSpaceId=${id}&labels=${labelId}&assignees=${userId}`,
            `/all-issues/filter?workSpaceId=${id}&assignees=${assignee}`,
            {
               params: filterParams,
            }
         )

         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
