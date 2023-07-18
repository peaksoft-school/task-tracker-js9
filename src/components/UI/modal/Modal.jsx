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
   padding: '16px 20px',
   top: '40%',
}))
const Backdrop = styled(Modal)(() => ({
   position: 'absolute',
   top: '0',
   left: '0',
   width: '100%',
   height: 'auto',
   backgroundColor: 'rgba(240, 230, 230, 0.464)',
   backdropFilter: 'blur(2px)',
   zIndex: '998',
   minHeight: '11.615rem',
}))
