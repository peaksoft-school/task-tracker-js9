import React from 'react'
import { Snackbar } from './components/UI/snackbar/Snackbar'

const App = () => {
   return (
      <div>
         <Snackbar
            message="Avatar removed"
            additionalMessage="we've deleted your avatar."
            severity="success"
         />
      </div>
   )
}

export default App
