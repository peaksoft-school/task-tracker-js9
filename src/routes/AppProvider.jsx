// import { useSelector } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/SingUpage'
import { SignInPage } from '../pages/SignInPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { Workspaces } from '../components/workspace/Workspace'
import { Board } from '../components/board/Board'
import { Headers } from '../components/header/Header'
import { PrivateRoute } from './PrivateRoute'
import { USER_ROLE } from '../utils/constants/authorization'
import { boards } from '../utils/constants/general'

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
      path: `/forgotPassword`,
      element: <ResetPasswordPage />,
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
      children: [
         {
            path: ':id/boards',
            element: <Board boards={boards} />,
         },
      ],
   },

   {
      path: '*',
      element: <h1>Этой страницы не существует!!! </h1>,
   },
])

// import { Routes, Route } from 'react-router-dom'
// import { SignUpPage } from '../pages/SingUpage'
// import { SignInPage } from '../pages/SignInPage'
// import { ResetPasswordPage } from '../pages/ResetPasswordPage'
// import { Workspaces } from '../components/workspace/Workspace'
// import { Headers } from '../components/header/Header'
// import { PrivateRoute } from './PrivateRoute'
// import { USER_ROLE } from '../utils/constants/authorization'

// export const routes = (
//    <Routes>
//       <Route
//          path="/"
//          element={
//             <PrivateRoute
//                component={<SignInPage />}
//                roles={[USER_ROLE.GUEST]}
//                fallBacPath="/mainPage"
//             />
//          }
//       />
//       <Route
//          path="/signup"
//          element={
//             <PrivateRoute
//                component={<SignUpPage />}
//                roles={[USER_ROLE.GUEST]}
//                fallBacPath="/mainPage"
//             />
//          }
//       />
//       <Route path="/forgotPassword" element={<ResetPasswordPage />} />
//       <Route
//          path="/mainPage"
//          element={
//             <PrivateRoute
//                component={
//                   <>
//                      <Headers />
//                      <Workspaces />
//                   </>
//                }
//                roles={[USER_ROLE.ADMIN, USER_ROLE.USER]}
//                fallBacPath="/"
//             />
//          }
//       />
//       <Route path="*" element={<h1>Этой страницы не существует!!!</h1>} />
//    </Routes>
// )
