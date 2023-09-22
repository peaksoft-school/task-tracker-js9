import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { PlusIcon } from '../../../assets/icons'
import { Input } from '../../UI/input/Input'
import { Button } from '../../UI/button/Button'
import { postItemToItems } from '../../../store/checkList/CheckListThunk'
import CheckListMainItem from './CheckListMainItem'

export const CheckListMain = ({ isAddDisabled, itemResponseList, id }) => {
   const [idCounter, setIdCounter] = useState(0)
   const [newItemValue, setNewItemValue] = useState('')
   const [open, setOpen] = useState(false)
   const { carId } = useParams()

   const dispatch = useDispatch()

   const handleNewItemChange = (e) => {
      setNewItemValue(e.target.value)
   }

   const addItem = () => {
      if (!newItemValue.trim() || isAddDisabled) {
         return
      }

      const newItem = {
         checkListId: id,
         title: newItemValue,
         carId,
      }

      dispatch(postItemToItems(newItem))

      setIdCounter(idCounter + 1)
      setNewItemValue('')
   }

   const toggleInputs = () => {
      setOpen((prev) => !prev)
   }

   return (
      <Main>
         <div>
            {itemResponseList?.map((item) => {
               return <CheckListMainItem item={item} key={item.itemId} />
            })}
         </div>

         {open ? (
            <div>
               <ItemContainer>
                  <StyledInput
                     type="text"
                     value={newItemValue}
                     onChange={handleNewItemChange}
                     placeholder="Add a description"
                  />
               </ItemContainer>
               <ActionButtonsContainer>
                  <CancelButton onClick={toggleInputs}>Cancel</CancelButton>
                  <AddButton onClick={addItem}>Add</AddButton>
               </ActionButtonsContainer>
            </div>
         ) : (
            <ButtonBox>
               <AddnewButton onClick={toggleInputs}>
                  <PlusIconContainer>
                     <PlusIcon />
                     <p>Add an item</p>
                  </PlusIconContainer>
               </AddnewButton>
            </ButtonBox>
         )}
      </Main>
   )
}

const Main = styled('div')({
   width: '41.1875rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
})

const ItemContainer = styled('div')(({ completed }) => ({
   display: 'flex',
   alignItems: 'center',
   width: '41.875rem',
   border: '0.0625rem',
   background: completed ? '#F2F2F2' : 'transparent',
}))

const StyledInput = styled(Input)({
   input: {
      backgroundColor: 'none',
      fontSize: '1rem',
      width: '39.9931rem',
      borderRadius: '5rem',
      padding: '1.3rem 1.3rem 5.5rem',
   },
   marginTop: '0.5rem',
})

const ActionButtonsContainer = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '10px',
   gap: '1rem',
})

const CancelButton = styled(Button)({
   fontFamily: 'CarePro',
   color: '#919191',
   borderRadius: ' 1.5rem',
   height: '2.1rem',
   width: '5.41313rem',
   padding: '0.275rem 1rem 0.375rem 0.5rem ',
   backgroundColor: '#F0F0F0',
   textAlign: 'center',
   fontSize: '0.91rem',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#cecdcd',
      color: '#fff',
      '&:active': {
         backgroundColor: '#F0F0F0',
      },
   },
})

const AddButton = styled(Button)({
   fontFamily: 'CarePro',
   color: '#fff',
   borderRadius: ' 1.5rem',
   width: '4.3rem',
   padding: '0.3rem 1rem 0 0.3rem',
   height: '2.1rem',
   textAlign: 'center',
   fontSize: '0.875rem',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})

const ButtonBox = styled('div')({
   display: 'flex',
   justifyContent: 'end',
   marginTop: '0.5rem',
})

const AddnewButton = styled(Button)({
   fontFamily: 'CarePro',
   color: 'black',
   borderRadius: '0.5rem',
   padding: '0 0.3rem 0 0.3rem',
   height: '2rem',
   textTransform: 'capitalize',
   width: '8.9375rem',
   boxSizing: 'border-box',
   background: 'none',
   border: '0.0625rem solid #F2F2F2',
   display: 'inline-block',
   fontSize: '0.91rem',
   textAlign: 'center',
})

const PlusIconContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
})
