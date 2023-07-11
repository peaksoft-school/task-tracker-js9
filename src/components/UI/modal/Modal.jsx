import { Box, Modal, styled } from '@mui/material'
import React from 'react'

export const ModalUi = ({ children, ...rest }) => {
   return (
      <>
         {' '}
         <Backdrop>
            <ModalStyle {...rest}>{children}</ModalStyle>
         </Backdrop>
      </>
   )
}
const ModalStyle = styled(Box)(({ ...rest }) => ({
   position: 'fixed',
   left: '50%',
   backgroundColor: 'white',
   borderRadius: '10px',
   width: rest.width,
   padding: '16px 20px',
   height: rest.height,
   transform: 'translate(-50%, -50%)',
   border: 'none',
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
