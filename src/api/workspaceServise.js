import { axiosInstance } from '../config/axiosInstance'

export const getWorkspaces = () => {
   return axiosInstance.get('/api/work_spaces')
}
