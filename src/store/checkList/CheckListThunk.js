import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const checkListGetRequest = createAsyncThunk(
   'checkList/CheckListGetRequest',
   async (cardId) => {
      try {
         const response = await axiosInstance.get(`/api/checkList/${cardId}`)
         return response.data
      } catch (error) {
         return error.message
      }
   }
)
export const checkListPutRequest = createAsyncThunk(
   'checkList/CheckListPutRequest',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/checkList/${data.checkListId}`,
            data
         )

         dispatch(checkListGetRequest(55))

         return response.data
      } catch (error) {
         return error.message
      }
   }
)

export const checkListDeleteRequest = createAsyncThunk(
   'checkList/CheckListDeleteRequest',
   async (checkListId) => {
      try {
         await axiosInstance.delete(`/api/checkList/${checkListId}`)
      } catch (error) {
         return error.message
      }
   }
)

export const postItemToItems = createAsyncThunk(
   'checkList/postItemToItems',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.post(`api/items`, data)

         dispatch(checkListGetRequest(55))

         return response
      } catch (error) {
         return error
      }
   }
)

export const putItemToItems = createAsyncThunk(
   'checkList/putItemToItems',
   async (id, { dispatch }) => {
      try {
         const response = await axiosInstance.put(`api/items/${id}`)

         dispatch(checkListGetRequest(55))
         return response
      } catch (error) {
         return error
      }
   }
)

export const deleteListInLists = createAsyncThunk(
   'checkList/deleteListInLists',
   async (id, { dispatch }) => {
      try {
         const response = await axiosInstance.delete(`api/checkList/${id}`)

         dispatch(checkListGetRequest(55))

         return response
      } catch (error) {
         return error
      }
   }
)

export const deleteItemInItems = createAsyncThunk(
   'checkList/deleteItemInItems',
   async (id, { dispatch }) => {
      try {
         console.log('id: ', id)
         const response = await axiosInstance.delete(`api/items/${id}`)
         dispatch(checkListGetRequest(55))

         return response
      } catch (error) {
         return error
      }
   }
)
