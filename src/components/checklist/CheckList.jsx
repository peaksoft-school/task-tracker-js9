import React, { useState } from 'react'
import { IconButton, Checkbox, styled } from '@mui/material'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import {
   UpIcon,
   DownIcon,
   PlusIcon,
   DeleteIcon,
   EditIcon,
} from '../../assets/icons'

export const CheckList = ({ title }) => {
   const [showInputs, setShowInputs] = useState(false)
   const [items, setItems] = useState([])
   const [idCounter, setIdCounter] = useState(0)
   const [newItemValue, setNewItemValue] = useState('')
   const [taskCount, setTaskCount] = useState(0)
   const [isTaskListVisible, setTaskListVisible] = useState(false)
   const [open, setOpen] = useState(false)
   const [editId, setEditId] = useState(false)
   const [editTitle, setEditTitle] = useState('')
   const [edit, serEdit] = useState([])
   const [state, setState] = useState(false)
   const maxTaskCount = 5

   const handleNewItemChange = (e) => {
      setNewItemValue(e.target.value)
   }

   const addItem = () => {
      if (!newItemValue.trim() || taskCount >= maxTaskCount) {
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

   const editHandler = (title) => {
      setEditTitle(title)
      setEditId(true)
      setState(true)
   }

   const saveHandler = () => {
      const data = {
         title: editTitle,
      }
      serEdit([...edit, data])
      setEditId(false)
   }
   return (
      <ChecklistContainer>
         <CheckListHeaderContainer>
            <ChecklistHeader>
               <CheckListBox>
                  <StyledIconButton onClick={cancelAddItem}>
                     {showInputs ? <DownIcon /> : <UpIcon />}
                  </StyledIconButton>

                  {editId === true ? (
                     <div>
                        <input
                           type="text"
                           value={editTitle}
                           onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <Button onClick={saveHandler}>Save</Button>
                        <Button onClick={() => setEditId(false)}>Cancel</Button>
                     </div>
                  ) : (
                     <>
                        <StyledIconButton>
                           <EditIcon onClick={() => editHandler(title)} />
                        </StyledIconButton>
                        {state ? (
                           <Title>
                              {edit.map((item) => (
                                 <Title>{item.title}</Title>
                              ))}
                           </Title>
                        ) : (
                           <Title>{title}</Title>
                        )}
                     </>
                  )}
               </CheckListBox>
               <DeleteBox>
                  <IconButton>
                     <DeleteIcon />
                  </IconButton>
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
                     <div>
                        {items.map((item) => (
                           <ItemContainer
                              key={item.id}
                              completed={item.completed}
                           >
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
                  <div>
                     <ItemContainer>
                        <Checkbox checked={false} />
                        <StyledInput
                           type="text"
                           value={newItemValue}
                           onChange={handleNewItemChange}
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
         ) : null}
      </ChecklistContainer>
   )
}

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

const ChecklistContainer = styled('div')({
   width: '100%',
   height: '100vh',
   borderRadius: '5px',
   padding: '10px',
   marginBottom: '10px',
})

const ChecklistHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const Title = styled('p')({
   fontSize: '1rem',
   color: '#111',
   fontFamily: 'CarePro',
   fontWeight: '400',
})

const ProgressContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginTop: '0.5rem',
   borderRadius: '0.5rem',
})

const CheckListHeaderContainer = styled('div')({
   width: '41.875rem',
})

const ProgressLine = styled('div')({
   height: '0.625rem',
   borderRadius: '5px',
   backgroundColor: '#ccc',
   flex: 1,
})

const ProgressBar = styled('div')(({ progress }) => ({
   borderRadius: '5px',
   backgroundColor: '#007bff',
   width: `${progress}%`,
   height: '0.625rem',
}))

const ProgressLabel = styled('span')({
   fontSize: '1rem',
   marginLeft: '0.63rem',
   color: '#787878',
   fontFamily: 'Gilroy',
   fontWeight: '400',
})

const TaskCountContainer = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   marginRight: '0.63rem',
   fontSize: '1rem',
   marginLeft: '0.63rem',
   color: '#787878',
   fontFamily: 'Gilroy',
   fontWeight: '400',
})

const CheckListBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
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

const ActionButtonsContainer = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '10px',
   gap: '1rem',
})

const StyledIconButton = styled(IconButton)({
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',
   gap: '0.25rem',
})

const Main = styled('div')({
   // height: '15vh',
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
   fontSize: '1rem',
   color: '#787878',
   fontFamily: 'CarePro',
   fontWeight: '400',
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

const ButtonBox = styled('div')({
   display: 'flex',
   justifyContent: 'end',
   marginTop: '0.5rem',
})
