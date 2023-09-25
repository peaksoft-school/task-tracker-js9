import React from 'react'
import { styled } from '@mui/material'
import { ModalUi } from '../UI/modal/Modal'
import { CloseIcon } from '../../assets/icons'

const ModalPage = ({ image, open, selectedImage }) => {
   return (
      <ModalStyled open={open} onClose={() => selectedImage(false)}>
         <ImageContainer>
            <CloseButton onClick={() => selectedImage(false)}>
               <CloseIcon fill="red" />
            </CloseButton>
            <ImageStyled
               style={{ zIndex: -1 }}
               src={image.documentLink}
               alt=""
            />
         </ImageContainer>
      </ModalStyled>
   )
}

const ImageContainer = styled('div')({
   position: 'relative',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%',
})

const CloseButton = styled('div')({
   position: 'absolute',
   top: '20px',
   right: '20px',
   cursor: 'pointer',
})

const ImageStyled = styled('img')({
   maxWidth: '100%',
   maxHeight: '100%',
   borderRadius: '0.5rem',
})

const ModalStyled = styled(ModalUi)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   maxWidth: '100%',
   maxHeight: '100%',
   padding: '0',
})

export default ModalPage
