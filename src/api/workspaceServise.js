import { axiosInstance } from '../config/axiosInstance'

export const getWorkspaces = () => {
   return axiosInstance.get('/api/work_spaces')
}
export const getWorkspacesById = (id) => {
   return axiosInstance.get(`/api/work_spaces/${id}`)
}
