import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllComments = createAsyncThunk(
   'comments/getAllComments',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/comments/comments/${4}`)
         return response.data
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Something went wrong!'
         )
      }
   }
)

export const postComments = createAsyncThunk(
   'comments/postComments',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(`/api/comments`, payload)
         dispatch(getAllComments())
         return response
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Something went wrong!'
         )
      }
   }
)

export const editComment = createAsyncThunk(
   'comments/editComment',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.put(
            `/api/comments/${payload.commentId}`,
            {
               comment: payload.comment,
               cardId: payload.commentId,
            }
         )
         dispatch(getAllComments())
         return data
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Something went wrong!'
         )
      }
   }
)

export const deleteComment = createAsyncThunk(
   'comments/deleteComment',
   async (deleteCommentById, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/comments/${deleteCommentById}`
         )
         dispatch(getAllComments())
         return data
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Something went wrong!'
         )
      }
   }
)

export const getCommentsbyId = createAsyncThunk(
   'comments/getCommentsbyId',
   async (payload, { rejectWithValue }) => {
      const { commentId, navigate } = payload

      try {
         const response = await axiosInstance.get(`/api/comments/${commentId}`)
         if (navigate) {
            navigate(`/profile/${commentId}`, { state: { edit: 'true' } })
         }
         return response.data
      } catch (error) {
         return rejectWithValue(
            error?.response?.data || 'Something went wrong!'
         )
      }
   }
)
