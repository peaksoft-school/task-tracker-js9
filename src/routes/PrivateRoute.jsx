import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component, fallBacPath, roles }) => {
   const { role } = useSelector((state) => state.auth)

   const isAllowed = () => {
      return roles.includes(role)
   }

   if (!isAllowed()) {
      return <Navigate to={fallBacPath} />
   }

   return component
}
