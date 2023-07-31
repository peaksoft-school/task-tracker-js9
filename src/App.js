import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material'
import { theme } from './assets/styles/theme'
import { routes } from './routes/AppProvider'

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
