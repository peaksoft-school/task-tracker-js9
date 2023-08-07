import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component, fallBacPath, isAllowed }) => {
   if (!isAllowed) {
      return <Navigate to={fallBacPath} />
   }
   return component
}
