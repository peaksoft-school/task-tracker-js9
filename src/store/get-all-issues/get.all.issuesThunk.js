import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllIssues = createAsyncThunk(
   'allIssues/getAllIssues',
   async (
      { filterParams, labels, assignee, id, checked },
      { rejectWithValue }
   ) => {
      console.log('checked: ', checked)

      try {
         const response = await axiosInstance.get(
            `/all-issues/filter?workSpaceId=${id}&labels=${labels}&assignees=${assignee}`,
            {
               params: {
                  ...filterParams,
                  checklist: checked,
               },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   }
)
