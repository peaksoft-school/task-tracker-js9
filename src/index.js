import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import App from './App'
import './index.css'
import { injectStore } from './config/axiosInstance'
import { store } from './store'
import { Labels } from './components/labels/Labels'

injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <Provider store={store}>
         {/* <App /> */}
         <Labels />
      </Provider>
   </React.StrictMode>
)
