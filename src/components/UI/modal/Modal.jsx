import { Box, Modal, styled } from '@mui/material'
import React from 'react'

export const ModalUi = ({ open, onClose, children, ...rest }) => {
   return (
      <Backdrop open={open} onClose={onClose}>
         <ModalStyle {...rest}>{children}</ModalStyle>
      </Backdrop>
   )
}
const ModalStyle = styled(Box)(({ ...rest }) => ({
   position: 'fixed',
   left: '50%',
   borderRadius: '10px',
   width: rest.width,
   transform: 'translate(-50%, -50%)',
   height: rest.height,
   border: 'none',
   backgroundColor: 'white',
   padding: rest.padding || '16px 20px',
   top: '40%',
   overflow: 'auto',
}))
const Backdrop = styled(Modal)(({ ...rest }) => ({
   position: 'absolute',
   top: '0',
   left: '0',
   right: '0',
   bottom: '0',
   width: '100%',
   height: '100vh',
   backgroundColor: 'rgba(240, 230, 230, 0.464)',
   backdropFilter: rest.backdropFilter || 'blur(2px)',
   zIndex: '990',
   minHeight: '11.615rem',
}))
