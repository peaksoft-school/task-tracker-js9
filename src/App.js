import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { theme } from './assets/styles/theme'
import { routes } from './routes/AppProvider'
import { store } from './store'

function App() {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Provider store={store}>
            <ToastContainer />
            <ThemeProvider theme={theme}>
               <RouterProvider router={routes} />
            </ThemeProvider>
         </Provider>
      </LocalizationProvider>
   )
}
export default App
