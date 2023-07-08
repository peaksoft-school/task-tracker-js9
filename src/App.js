import React from 'react'
import { Button } from '@mui/material'
import { showSnackbar } from './components/UI/snackbar/Snackbar'

const App = () => {
   const handleButtonClick = () => {
      showSnackbar({
         message: 'Snackbar message',
         additionalMessage: 'Additional message',
         severity: 'success',
      })
   }

   return (
      <div>
         <Button onClick={handleButtonClick}>Show Snackbar</Button>
      </div>
   )
}

export default App
