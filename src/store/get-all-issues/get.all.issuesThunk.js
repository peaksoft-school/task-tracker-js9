import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

// export const getAllIssues = createAsyncThunk(
//    'allIssues/getAllIssues',
//    async ({ filterParams, labels, assignee, id }, { rejectWithValue }) => {
//       try {
//          const response = await axiosInstance.get(
//             `/all-issues/filter?workSpaceId=${id}&labels=${labels}&assignees=${assignee}`,
//             {
//                params: filterParams,
//             }
//          )
//          return response.data
//       } catch (error) {
//          return rejectWithValue(error.response.data)
//       }
//    }
// )

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

// export const getSearchMembers = createAsyncThunk(
//    'searchMember/getSearchMembers',
//    async ({ id, email }, { rejectWithValue }) => {
//       try {
//          const response = await axiosInstance.get(
//             `/api/members/search?workSpaceId=${id}&email=${email}`
//          )
//          return response.data
//       } catch (err) {
//          return rejectWithValue(err)
//       }
//    }
// )
