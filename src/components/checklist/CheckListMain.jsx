import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, IconButton, styled } from '@mui/material'
import { DeleteIcon, PlusIcon } from '../../assets/icons'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'

export const CheckListMain = ({
   isAddDisabled,
   items,
   setItems,
   setTaskCount,
   taskCount,
   setTaskListVisible,
   isTaskListVisible,
   toggleCompleted,
   openModal,
   toggleInputs,
   open,
   setNewItemValue,
   newItemValue,
}) => {
   const [idCounter, setIdCounter] = useState(0)
   const { item } = useSelector((state) => state.checkList)
   console.log('item: ', item)

   const handleNewItemChange = (e) => {
      setNewItemValue(e.target.value)
   }

   const addItem = () => {
      if (!newItemValue.trim() || isAddDisabled) {
         return
      }

      const newItem = {
         id: idCounter,
         value: newItemValue,
         completed: false,
      }
      setItems([...items, newItem])
      setIdCounter(idCounter + 1)
      setNewItemValue('')
      setTaskCount(taskCount + 1)
      setTaskListVisible(true)
   }

   return (
      <Main>
         <div>
            {isTaskListVisible &&
               items.map((item) => (
                  <ItemContainer key={item.id} completed={item.completed}>
                     <Checkbox
                        checked={item.completed}
                        onChange={() => toggleCompleted(item.id)}
                     />
                     <ItemText>{item.value}</ItemText>
                     <StyledIconButton onClick={() => openModal(item.id)}>
                        <DeleteIcon />
                     </StyledIconButton>
                  </ItemContainer>
               ))}
         </div>
         {open ? (
            <div>
               <ItemContainer>
                  <StyledInput
                     type="text"
                     value={newItemValue}
                     onChange={handleNewItemChange}
                  />
               </ItemContainer>
               <ActionButtonsContainer>
                  <CancelButton onClick={toggleInputs}>Cancel</CancelButton>
                  <AddButton onClick={addItem} disabled={isAddDisabled}>
                     Add
                  </AddButton>
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
