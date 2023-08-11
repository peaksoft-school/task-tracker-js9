import { axiosInstance } from '../config/axiosInstance'

export const getCommentsRequest = () => {
   return axiosInstance.get('/api/comments/comments')
}
