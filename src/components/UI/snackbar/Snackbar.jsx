import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'

const CloseButton = ({ color }) => {
   return (
      <FaTimes
         style={{
            color,
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
         }}
      />
   )
}

const CustomToast = ({ message, additionalMessage, severity }) => {
   let firstWordStyle = {
      color: '',
      fontSize: '',
      marginBottom: '10px',
   }
   let secondWordStyle = {
      color: '',
      fontSize: '',
   }

   if (severity === 'success') {
      firstWordStyle = {
         color: '#006400',
         fontSize: '20px',
      }
      secondWordStyle = {
         color: '#008000',
         fontSize: '15px',
      }
   } else if (severity === 'error') {
      firstWordStyle = {
         color: '#FF0000',
         fontSize: '20px',
      }
      secondWordStyle = {
         color: '#CD5C5C',
         fontSize: '15px',
      }
   } else if (severity === 'warning') {
      firstWordStyle = {
         color: '#FF8C00',
         fontSize: '20px',
      }
      secondWordStyle = {
         color: '#FFA500',
         fontSize: '15px',
      }
   }

   return (
      <div>
         <div style={firstWordStyle}>{message}</div>
         <div style={secondWordStyle}>{additionalMessage}</div>
      </div>
   )
}

export const Snackbar = ({ message, additionalMessage, severity }) => {
   let closeButtonColor = '#FF0000'

   if (severity === 'success') {
      closeButtonColor = '#008000'
   } else if (severity === 'warning') {
      closeButtonColor = '#FFA500'
   }

   toast[severity](
      <CustomToast
         message={message}
         additionalMessage={additionalMessage}
         severity={severity}
      />
   )

   return (
      <div>
         <ToastContainer
            closeButton={<CloseButton color={closeButtonColor} />}
         />
      </div>
   )
}
