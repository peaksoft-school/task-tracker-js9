import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@emotion/react'
import { routes } from './routes/AppProvider'
import { theme } from './assets/styles/theme'

function App() {
   return (
      <>
         <ToastContainer />
         <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
         </ThemeProvider>
      </>
   )
}
export default App
