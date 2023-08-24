import { axiosInstance } from '../config/axiosInstance'

export const getWorkspaces = () => {
   return axiosInstance.get('/api/work_spaces')
}
export const getWorkspacesById = (id) => {
   return axiosInstance.get(`/api/work_spaces/${id}`)
}
export const createWorkspaces = (newdata) => {
   return axiosInstance.post('/api/work_spaces', newdata)
}
export const deleteWorkspaces = (workSpaceId) => {
   return axiosInstance.delete(`/api/work_spaces/${workSpaceId}`)
}
export const updateWorkspacesById = ({ id, name }) => {
   return axiosInstance.put(`/api/work_spaces/${id}`, { name })
}
