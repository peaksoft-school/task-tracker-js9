import { Box, Modal, styled } from '@mui/material'
import React from 'react'

export const ModalUi = ({ children, ...rest }) => {
   const [open, setOpen] = React.useState(false)
   const handleClose = () => setOpen(false)

   return (
      <div>
         <Backdrop onClose={handleClose} open={open}>
            <ModalStyle {...rest}>{children}</ModalStyle>
         </Backdrop>
      </div>
   )
}
const ModalStyle = styled(Box)(({ ...rest }) => ({
   position: 'fixed',
   padding: '16px 20px',
   left: '50%',
   backgroundColor: 'white',
   borderRadius: '10px',
   width: rest.width,
   height: rest.height,
   top: '40%',
   transform: 'translate(-50%, -50%)',
   border: 'none',
}))
const Backdrop = styled(Modal)(() => ({
   position: 'absolute',
   top: '0',
   left: '0',
   width: '100%',
   height: 'auto',
   backgroundColor: 'rgba(239, 230, 230, 0.464)',
   backdropFilter: 'blur(2px)',
   zIndex: '998',
   minHeight: '11.615rem',
}))
