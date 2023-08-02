import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { Board } from './components/board/Board'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <Provider store={store}>
         <Board />
      </Provider>
   </React.StrictMode>
)
