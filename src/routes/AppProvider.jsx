import { Outlet, createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/SingUpage'
import { SignInPage } from '../pages/SignInPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { Headers } from '../components/header/Header'
import { PrivateRoute } from './PrivateRoute'
import { USER_ROLE } from '../utils/constants/authorization'
import { Profile } from '../components/profile/Profile'
// import { Workspaces } from '../components/workspace/Workspace'
import { Columns } from '../components/column/Columns'

export const routes = createBrowserRouter([
   {
      path: '/',
      element: (
         <PrivateRoute
            component={<SignInPage />}
            roles={[USER_ROLE.GUEST]}
            fallBacPath="/mainPage"
         />
      ),
   },
   {
      path: '/signup',
      element: (
         <PrivateRoute
            component={<SignUpPage />}
            roles={[USER_ROLE.GUEST]}
            fallBacPath="/mainPage"
         />
      ),
   },
   {
      path: `/forgotPassword/:id`,
      element: (
         <PrivateRoute
            component={<ResetPasswordPage />}
            roles={[USER_ROLE.GUEST]}
            fallBacPath="/mainPage"
         />
      ),
   },
   {
      path: '/mainPage',
      element: (
         <>
            <PrivateRoute
               component={
                  <>
                     <Headers />
                     <Columns />
                  </>
               }
               roles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
               fallBacPath="/"
            />
            <Outlet />
         </>
      ),
   },
   {
      path: '/profile',
      element: (
         <>
            <Headers />
            <Profile />,
         </>
      ),
   },

   {
      path: '*',
      element: <h1>Этой страницы не существует!!! </h1>,
   },
])
