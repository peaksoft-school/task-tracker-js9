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

         dispatch(checkListGetRequest(data.carId))

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

         dispatch(checkListGetRequest(data.carId))

         return response
      } catch (error) {
         return error
      }
   }
)

export const putItemToItems = createAsyncThunk(
   'checkList/putItemToItems',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.put(`api/items/${data.id}`)

         dispatch(checkListGetRequest(data.carId))
         return response
      } catch (error) {
         return error
      }
   }
)

export const deleteListInLists = createAsyncThunk(
   'checkList/deleteListInLists',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.delete(`api/checkList/${data.id}`)

         dispatch(checkListGetRequest(data.carId))

         return response
      } catch (error) {
         return error
      }
   }
)

export const deleteItemInItems = createAsyncThunk(
   'checkList/deleteItemInItems',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.delete(`api/items/${data.itemId}`)
         dispatch(checkListGetRequest(data.carId))

         return response
      } catch (error) {
         return error
      }
   }
)

export const createdCheckListRequest = createAsyncThunk(
   'checkList/createCheckListRequest',
   async (data, { dispatch }) => {
      try {
         const response = await axiosInstance.post(
            `/api/checkList/${data.cardId}`,
            data
         )
         dispatch(checkListGetRequest(data.cardId))
         return response
      } catch (error) {
         return error.message
      }
   }
)
