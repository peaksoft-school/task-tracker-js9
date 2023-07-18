import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './assets/styles/theme'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <ToastContainer />
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ThemeProvider>
   </React.StrictMode>
)
