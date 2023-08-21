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
   // store.getState().login.accessToken
   const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTI2NTYxMzAsImlhdCI6MTY5MjU5NjEzMCwidXNlcm5hbWUiOiJzdHJpbmdAZ21haWwuY29tIn0.HgIkIDrL4wjoIZswQXU_AOtX6btk2w33_-qHx1PL37Y'

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
      if (!error.response.ok) {
         store.dispatch(logoutAction())
      }
      return Promise.reject(error)
   }
)
export { axiosInstance }
