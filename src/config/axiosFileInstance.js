import axios from 'axios'
import { BASE_URL } from '../utils/constants/baseURL'

const logoutAction = () => {}

const headers = {
   'Content-Type': 'multipart/from-data',
}

const axiosFileInstance = axios.create({
   baseURL: BASE_URL,
   headers,
})

let store

export const injectStore = (_store) => {
   store = _store
}

axiosFileInstance.interceptors.request.use((config) => {
   const updatedConfig = { ...config }
   // store.getState().login.accessToken
   const { token } =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTI4MzIwMjEsImlhdCI6MTY5Mjc3MjAyMSwidXNlcm5hbWUiOiJzdHJpbmdAZ21haWwuY29tIn0.P31nfvK3oQ1YFyeBj7WGwdUg84Q1E2XM8z4yHKIHkdI'
   if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
   }
   return updatedConfig
})

axiosFileInstance.interceptors.response.use(
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
export { axiosFileInstance }
