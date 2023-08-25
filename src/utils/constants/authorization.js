export const BASE_URL = 'http://18.195.216.178'
export const role = 'ADMIN'

export const isAllowed = (roles) => {
   return roles.includes(role)
}

export const USER_ROLE = {
   ADMIN: 'ADMIN',
   GUEST: 'GUEST',
   USER: 'USER',
}

export const STORAGE_KEY = {
   TASK_TRACER_AUTH_KEY: 'TASK_TRACER_AUTH_KEY',
}
