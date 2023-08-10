import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { Favourite } from './components/favourite/Favourite'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <Provider store={store}>
         <Favourite />
      </Provider>
   </React.StrictMode>
)
