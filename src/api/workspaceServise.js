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
export const addtoFawotites = (newdata) => {
   return axiosInstance.put(`/api/work_spaces/${newdata.id}`, newdata)
}
