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
   const [edit, setEdit] = useState([])
   const [state, setState] = useState(false)
   const maxTaskCount = 5
   const isAddDisabled = taskCount >= maxTaskCount

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
      setEdit([...edit, data])
      setEditId(false)
   }

   const [showModal, setShowModal] = useState(false)
   const [itemToDeleteId, setItemToDeleteId] = useState(null)

   const openModal = (id) => {
      setItemToDeleteId(id)
      setShowModal(true)
   }

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
      <ChecklistContainer>
         <CheckListHeaderContainer>
            <ChecklistHeader>
               <CheckListBox>
                  <StyledIconButton onClick={cancelAddItem}>
                     {showInputs ? <DownIcon /> : <UpIcon />}
                  </StyledIconButton>

                  {editId === true ? (
                     <div>
                        <EditInput
                           type="text"
                           value={editTitle}
                           onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <ButtonSave onClick={saveHandler}>Save</ButtonSave>
                        <ButtonCancel onClick={() => setEditId(false)}>
                           Cancel
                        </ButtonCancel>
                     </div>
                  ) : (
                     <>
                        <StyledIconButton>
                           <EditIcon onClick={() => editHandler(title)} />
                        </StyledIconButton>
                        {state ? (
                           <Title>
                              {edit.map((item) => (
                                 <Title key={item.id}>{item.title}</Title>
                              ))}
                           </Title>
                        ) : (
                           <Title>{title}</Title>
                        )}
                     </>
                  )}
               </CheckListBox>
               <DeleteBox>
                  <IconButton onClick={() => openModal(title)}>
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
                        <CancelButton onClick={toggleInputs}>
                           Cancel
                        </CancelButton>
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
         ) : null}

         {showModal && (
            <ModalContainer>
               <ModalContent>
                  <ModalText>Are you sure you want to delete?</ModalText>
                  <ModalButtons>
                     <ModalButtonAdd onClick={handleDeleteItem}>
                        Yes
                     </ModalButtonAdd>
                     <ModalButtonCancel onClick={closeModal}>
                        Cancel
                     </ModalButtonCancel>
                  </ModalButtons>
               </ModalContent>
            </ModalContainer>
         )}
      </ChecklistContainer>
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

const EditInput = styled('input')({
   width: '6rem',
   height: '1.5rem',
})

const ModalButtons = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   gap: '1rem',
})

const ButtonSave = styled(Button)({
   width: '3rem',
   height: '1.5rem',
   fontSize: '0.6rem',
   marginLeft: '1rem',
   marginRight: '0.5rem',
   paddingTop: '0.3rem',
   paddingRight: '1.5rem',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})

const ButtonCancel = styled(Button)({
   width: '3rem',
   height: '1.5rem',
   fontSize: '0.6rem',
   paddingTop: '0.3rem',
   paddingRight: '1.3rem',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
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
