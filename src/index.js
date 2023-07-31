import React from 'react'
import ReactDOM from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import { ThemeProvider } from '@mui/material'
// import { theme } from './assets/styles/theme'
import './index.css'
import App from './App'
// import { routes } from './routes/AppProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
