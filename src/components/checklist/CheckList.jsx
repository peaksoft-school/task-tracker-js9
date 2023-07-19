import React, { useState } from 'react'
import { IconButton, Checkbox, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import { UpIcon, DownIcon, PlusIcon } from '../../assets/icons'

export const CheckList = ({ title }) => {
   const [showInputs, setShowInputs] = useState(false)
   const [items, setItems] = useState([])
   const [idCounter, setIdCounter] = useState(0)
   const [newItemValue, setNewItemValue] = useState('')
   const [taskCount, setTaskCount] = useState(0)
   const [isTaskListVisible, setTaskListVisible] = useState(false)
   const [open, setOpen] = useState(false)
   const maxTaskCount = 5

   const handleNewItemChange = (e) => {
      setNewItemValue(e.target.value)
   }

   const addItem = () => {
      if (taskCount >= maxTaskCount) {
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

   const toggleInputs = () => {
      setOpen((prev) => !prev)
      if (!showInputs && items.length > 0) {
         setTaskListVisible(true)
      }
   }
   const cancelAddItem = () => {
      setNewItemValue('')
      setShowInputs((prev) => !prev)
      // setOpen(false)
   }

   const toggleCompleted = (id) => {
      const updatedItems = items.map((item) =>
         item.id === id ? { ...item, completed: !item.completed } : item
      )
      setItems(updatedItems)
   }

   const removeItem = (id) => {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      setTaskCount(taskCount - 1)
      if (taskCount <= 1) {
         setTaskListVisible(false)
      }
   }

   const getProgress = () => {
      if (items.length === 0) {
         return 0
      }

      const completedCount = items.filter((item) => item.completed).length
      return Math.floor((completedCount / items.length) * 100)
   }

   return (
      <ChecklistContainer>
         <CheckListHeaderContainer>
            <ChecklistHeader>
               <CheckListBox>
                  <StyledIconButton onClick={cancelAddItem}>
                     {showInputs ? <DownIcon /> : <UpIcon />}
                  </StyledIconButton>
                  <StyledIconButton>
                     <EditIcon />
                  </StyledIconButton>
                  <Title>{title}</Title>
               </CheckListBox>
               <DeleteBox>
                  <DeleteIcon />
                  <p>Delete</p>
               </DeleteBox>
            </ChecklistHeader>
            <ProgressContainer>
               <TaskCountContainer>
                  <p>
                     {taskCount}/{maxTaskCount}
                  </p>
               </TaskCountContainer>
               <ProgressLine>
                  <ProgressBar progress={getProgress()} />
               </ProgressLine>
               <ProgressLabel>{getProgress()}%</ProgressLabel>
            </ProgressContainer>
         </CheckListHeaderContainer>

         {showInputs ? (
            <Main>
               <div>
                  {isTaskListVisible && (
                     <div className="map-item">
                        {items.map((item) => (
                           <ItemContainer key={item.id}>
                              <Checkbox
                                 checked={item.completed}
                                 onChange={() => toggleCompleted(item.id)}
                              />
                              <ItemText>{item.value}</ItemText>
                              <StyledIconButton
                                 onClick={() => removeItem(item.id)}
                              >
                                 <DeleteIcon />
                              </StyledIconButton>
                           </ItemContainer>
                        ))}
                     </div>
                  )}
               </div>
               {open ? (
                  <div style={{ marginTop: '3rem' }}>
                     <ItemContainer>
                        <Checkbox checked={false} />
                        <StyledInput
                           type="text"
                           value={newItemValue}
                           onChange={handleNewItemChange}
                           placeholder="Введите задачу"
                        />
                     </ItemContainer>
                     <ActionButtonsContainer>
                        <CancelButton onClick={toggleInputs}>
                           Cancel
                        </CancelButton>
                        <AddButton onClick={addItem}>Add</AddButton>
                     </ActionButtonsContainer>
                  </div>
               ) : (
                  <AddnewButton onClick={toggleInputs}>
                     <PlusIcon /> Add an items
                  </AddnewButton>
               )}
            </Main>
         ) : null}
      </ChecklistContainer>
   )
}

const StyledInput = styled(Input)({
   input: {
      fontSize: '14px',
      width: '39.9931rem',
      height: '5.5rem',
      borderRadius: '5rem',
      padding: '0.5rem 1rem 0.5rem 1rem',
      border: '0625rem',
   },
})

const ChecklistContainer = styled('div')({
   width: '100%',
   height: '100vh',
   borderRadius: '5px',
   padding: '10px',
   marginBottom: '10px',

   '.map-item': {
      marginTop: '4rem',
   },
})

const ChecklistHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const Title = styled('p')({
   margin: '0 10px',
   fontWeight: 'bold',
   fontSize: '16px',
})

const ProgressContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginTop: '0.5rem',
   borderRadius: '0.5rem',
})

const CheckListHeaderContainer = styled('div')({
   width: '41.875rem',
   height: '1.1875rem',
})

const ProgressLine = styled('div')({
   height: '0.8rem',
   borderRadius: '5px',
   backgroundColor: '#ccc',
   flex: 1,
})

const ProgressBar = styled('div')(({ progress }) => ({
   borderRadius: '5px',
   backgroundColor: '#007bff',
   width: `${progress}%`,
   height: '0.8rem',
}))

const ProgressLabel = styled('span')({
   fontSize: '1rem',
})

const TaskCountContainer = styled('div')({
   display: 'flex',
   justifyContent: 'center',
})

const CheckListBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
   gap: '',
})

const ItemContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   width: '41.875rem',
   border: '0.0625rem',
})

const ItemText = styled('p')({
   margin: '0 10px',
   flex: 1,
   fontSize: '14px',
})

const ActionButtonsContainer = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '10px',
})

const StyledIconButton = styled(IconButton)({
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',
   gap: '0.25rem',
})

const Main = styled('div')({
   height: '15vh',
   width: '41.1875rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
})

const DeleteBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.5rem',
})

const AddButton = styled(Button)({
   width: '4.1638rem',
   height: '1.875rem',
   borderRadius: '1.5rem',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontWeight: '400',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
})

const CancelButton = styled(Button)({
   width: '5.4131rem',
   height: '1.875rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
})

const AddnewButton = styled(Button)({
   width: '7.9375rem',
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',
   color: 'black',
   background: '#D0D0D0',
   boxSizing: 'border-box',
   padding: '0.375rem, 0.875rem, 0.375rem, 1rem',
})
