export const role = 'ADMIN'

export const isAllowed = (roles) => {
   return roles.includes(role)
}

export const USER_ROLE = {
   ADMIN: 'ADMIN',
   USER: 'USER',
}
