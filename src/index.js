import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { injectStore } from './config/axiosInstance'
import { store } from './store'
import { Labels } from './components/labels/Labels'

injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <Provider store={store}>
         <Labels />
      </Provider>
   </React.StrictMode>
)
