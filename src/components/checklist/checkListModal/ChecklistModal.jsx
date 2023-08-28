import React from 'react'
import { styled } from '@mui/material'
import { Button } from '../../UI/button/Button'
import { ModalUi } from '../../UI/modal/Modal'

export const CheckListModal = ({ deleteHandler, showModal, closeModal }) => {
   return (
      <ModalUi open={showModal} onClose={closeModal}>
         <ModalContent>
            <ModalText>Are you sure you want to delete?</ModalText>
            <ModalButtons>
               <ModalButtonCancel onClick={closeModal}>
                  Cancel
               </ModalButtonCancel>
               <ModalButtonAdd onClick={deleteHandler}>Yes</ModalButtonAdd>
            </ModalButtons>
         </ModalContent>
      </ModalUi>
   )
}

const ModalContent = styled('div')({
   backgroundColor: '#fff',
   padding: '1rem',
   borderRadius: '5px',
   width: '20rem',
   height: '15vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
})

const ModalText = styled('p')({
   fontSize: '1rem',
   fontWeight: 'bold',
   marginBottom: '1rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
})

const ModalButtons = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   gap: '1rem',
})

const ModalButtonAdd = styled(Button)({
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})

const ModalButtonCancel = styled(Button)({
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})
