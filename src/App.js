import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './assets/styles/theme'
import { store } from './store'
import { routes } from './routes/AppProvider'

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
