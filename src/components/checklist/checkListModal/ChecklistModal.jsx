import React from 'react'
import { styled } from '@mui/material'
import { Button } from '../../UI/button/Button'
import { ModalUi } from '../../UI/modal/Modal'

export const CheckListModal = ({ deleteHandler, showModal, closeModal }) => {
   return (
      <ModalUi open={showModal} onClose={closeModal}>
         <ModalContent>
            <ModalDeleteText>Delete task</ModalDeleteText>
            <ModalText>Are you sure you want to delete?</ModalText>
            <ModalButtons>
               <ModalButtonCancel onClick={closeModal}>
                  Cancel
               </ModalButtonCancel>
               <ModalButtonAdd onClick={deleteHandler}>Delete</ModalButtonAdd>
            </ModalButtons>
         </ModalContent>
      </ModalUi>
   )
}

const ModalContent = styled('div')({
   backgroundColor: '#fff',
   padding: '1rem',
   borderRadius: '5px',
   display: 'flex',
   flexDirection: 'column',
   width: '20.5rem',
   height: '9.125rem',
   gap: '1.4rem',
})

const ModalText = styled('p')({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '400',
})

const ModalButtons = styled('div')({
   display: 'flex',
   justifyContent: 'end',
   gap: '1rem',
})

const ModalButtonAdd = styled(Button)({
   background: '#D91212',
   '&:hover': {
      backgroundColor: '#e82b2b',
      '&:active': {
         backgroundColor: '#a70909',
      },
   },
})

const ModalButtonCancel = styled(Button)({
   background: '#b9b9b9',

   '&:hover': {
      backgroundColor: '#9d9d9d',
      '&:active': {
         backgroundColor: '#707070',
      },
   },
})

const ModalDeleteText = styled('p')({
   textAlign: 'center',
})
