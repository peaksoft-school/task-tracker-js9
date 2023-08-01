import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from './assets/styles/theme'
import { routes } from './routes/AppProvider'
import { store } from './store'

function App() {
   return (
      <Provider store={store}>
         <ToastContainer />
         <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
         </ThemeProvider>
      </Provider>
   )
}
export default App
