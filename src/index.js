import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import { LayoutMenu } from './components/LayouMenu/LayoutMenu'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <LayoutMenu />
   </React.StrictMode>
)
