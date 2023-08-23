import React from 'react'
import { styled } from '@mui/material'
import { Button } from '../UI/button/Button'

export const CheckListModal = ({
   itemToDeleteId,
   removeItem,
   setShowModal,
   setItemToDeleteId,
}) => {
   const closeModal = () => {
      setShowModal(false)
      setItemToDeleteId(null)
   }
   const handleDeleteItem = () => {
      if (itemToDeleteId !== null) {
         removeItem(itemToDeleteId)
         closeModal()
      }
   }

   return (
      <ModalContainer>
         <ModalContent>
            <ModalText>Are you sure you want to delete?</ModalText>
            <ModalButtons>
               <ModalButtonAdd onClick={handleDeleteItem}>Yes</ModalButtonAdd>
               <ModalButtonCancel onClick={closeModal}>
                  Cancel
               </ModalButtonCancel>
            </ModalButtons>
         </ModalContent>
      </ModalContainer>
   )
}

const ModalContainer = styled('div')({
   position: 'fixed',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(62, 60, 60, 0.5)',
   zIndex: 1,
})

const ModalContent = styled('div')({
   backgroundColor: '#fff',
   padding: '1rem',
   borderRadius: '5px',
   width: '30rem',
   height: '20vh',
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
   width: '6rem',
   height: '3rem',
   paddingTop: '0.8rem',
   paddingRight: '1.6rem',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})

const ModalButtonCancel = styled(Button)({
   width: '6rem',
   height: '3rem',
   paddingTop: '0.8rem',
   paddingRight: '1.6rem',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})
