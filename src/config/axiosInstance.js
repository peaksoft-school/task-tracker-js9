import axios from 'axios'
import { BASE_URL } from '../utils/constants/baseURL'

const logoutAction = () => {}

const headers = {
   'Content-Type': 'application/json',
}

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers,
})

let store

export const injectStore = (_store) => {
   store = _store
}

axiosInstance.interceptors.request.use((config) => {
   const updatedConfig = { ...config }
   // const token = store.getState().login.accessToken
   const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE2MjI0NDAsImlhdCI6MTY5MTU2MjQ0MCwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20ifQ.VizhYHFvbrW9ppmuGCBmSyAnuwkRkjUV9Xx-AZzPLks'
   if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
   }
   return updatedConfig
})

axiosInstance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },
   (error) => {
      if (error.response.status === 401) {
         store.dispatch(logoutAction())
      }
      return Promise.reject(error)
   }
)
export { axiosInstance }
