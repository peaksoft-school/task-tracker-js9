import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled, Checkbox, IconButton } from '@mui/material'
import {
   deleteItemInItems,
   putItemToItems,
} from '../../../store/checkList/CheckListThunk'
import { DeleteIcon } from '../../../assets/icons'
import { CheckListModal } from '../checkListModal/ChecklistModal'

const CheckListMainItem = ({ item }) => {
   const dispatch = useDispatch()
   const { carId } = useParams()

   const [showModal, setShowModal] = useState(false)

   const checkboxHandler = (id) => {
      const data = {
         id,
         carId,
      }
      dispatch(putItemToItems(data))
   }

   const handleDeleteItem = () => {
      const data = {
         itemId: item.itemId,
         carId,
      }
      dispatch(deleteItemInItems(data))
   }

   const openModal = () => {
      setShowModal(true)
   }

   const closeModal = () => {
      setShowModal(false)
   }

   return (
      <>
         <ItemContainer key={item.itemId} completed={item.isDone}>
            <Checkbox
               checked={item.isDone}
               onChange={() => checkboxHandler(item.itemId)}
            />

            <ItemText>{item.title}</ItemText>

            <StyledIconButton onClick={openModal}>
               <DeleteIcon />
            </StyledIconButton>
         </ItemContainer>

         {showModal && (
            <CheckListModal
               showModal={showModal}
               deleteHandler={handleDeleteItem}
               closeModal={closeModal}
            />
         )}
      </>
   )
}

export default CheckListMainItem

const ItemText = styled('p')({
   margin: '0 10px',
   flex: 1,
   fontSize: '14px',
})

const StyledIconButton = styled(IconButton)({
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',
   gap: '0.25rem',
})

const ItemContainer = styled('div')(({ completed }) => ({
   display: 'flex',
   alignItems: 'center',
   width: '41.875rem',
   border: '0.0625rem',
   background: completed ? '#F2F2F2' : 'transparent',
}))
