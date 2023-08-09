// import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { theme } from './assets/styles/theme'
// import { routes } from './routes/AppProvider'
import { store } from './store'
import { injectStore } from './config/axiosInstance'
import { routes } from './routes/AppProvider'

injectStore(store)

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
