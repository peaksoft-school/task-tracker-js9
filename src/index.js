import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { CheckList } from './components/checklist/CheckList'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <App />
      {/* <CheckList /> */}
   </React.StrictMode>
)
