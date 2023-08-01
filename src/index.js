import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
// import App from './App'
import { Board } from './components/board/Board'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      {/* <App /> */}
      <Provider store={store}>
         <Board />
      </Provider>
   </React.StrictMode>
)
