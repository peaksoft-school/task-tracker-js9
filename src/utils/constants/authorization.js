export const BASE_URL = 'http://tasktracker.peaksoftprojects.com'
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
   AUTH_KEY: 'AUTH_KEY',
}
