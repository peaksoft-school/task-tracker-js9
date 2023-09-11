import { createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/SingUpage'
import { SignInPage } from '../pages/SignInPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { Headers } from '../components/header/Header'
import { PrivateRoute } from './PrivateRoute'
import { USER_ROLE } from '../utils/constants/authorization'
import { Workspaces } from '../components/workspace/Workspace'
import { Profile } from '../components/profile/Profile'
import { BoardPage } from '../pages/BoardPage'
import { InnerPage } from '../pages/InnerPage'
import { ParticipantsPage } from '../pages/ParticipantsPage'

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
      path: '/mainPage/',
      element: (
         <PrivateRoute
            component={
               <>
                  <Headers />
                  <Workspaces />
               </>
            }
            roles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
            fallBacPath="/"
         />
      ),
   },
   {
      path: 'mainPage/:id/boards/',
      element: (
         <>
            <Headers />
            <BoardPage />
         </>
      ),
   },
   {
      path: '/profile',
      element: (
         <>
            <Headers />
            <Profile />
         </>
      ),
   },
   {
      path: '/profile/:profileId',
      element: (
         <>
            <Headers />
            <Profile />
         </>
      ),
   },
   {
      path: 'mainPage/:id/boards/:boardId/board',
      element: (
         <>
            <Headers />
            <InnerPage />
         </>
      ),
   },
   {
      path: 'mainPage/:partId/participants/',
      element: (
         <>
            <Headers />
            <ParticipantsPage />
         </>
      ),
   },

   {
      path: '*',
      element: <h1>Этой страницы не существует!!! </h1>,
   },
])
