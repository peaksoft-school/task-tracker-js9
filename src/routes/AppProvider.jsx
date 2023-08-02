import { createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/SingUpage'
import { SignInPage } from '../pages/SignInPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { Workspaces } from '../components/workspace/Workspace'
import { Headers } from '../components/header/Header'

export const routes = createBrowserRouter([
   {
      path: '/',
      element: <SignInPage />,
   },
   {
      path: '/signup',
      element: <SignUpPage />,
   },
   {
      path: `/forgotPassword`,
      element: <ResetPasswordPage />,
   },
   {
      path: '/mainPage',
      element: (
         <>
            <Headers />
            <Workspaces />
         </>
      ),
   },

   {
      path: '*',
      element: <h1>Этой страницы не существует!!! </h1>,
   },
])
