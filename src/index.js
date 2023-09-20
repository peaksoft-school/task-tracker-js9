import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { injectStore } from './config/axiosInstance'
import { store } from './store'
import { injectFileStore } from './config/axiosFileInstance'

injectStore(store)
injectFileStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
