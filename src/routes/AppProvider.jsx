import { createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/SingUpage'
import { SignInPage } from '../pages/SignInPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { Headers } from '../components/header/Header'
import { ProfileForm } from '../components/profile/Profile'

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
      path: 'resetPassword',
      element: <ResetPasswordPage />,
   },
   {
      path: '/mainPage',
      element: (
         <>
            <Headers />
            <ProfileForm />
         </>
      ),
   },

   {
      path: '*',
      element: <h1>Этой страницы не существует!!! </h1>,
   },
])
