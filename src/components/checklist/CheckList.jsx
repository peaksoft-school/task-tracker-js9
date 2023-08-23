import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { checkListGetRequest } from '../../store/checkList/CheckListThunk'
import { CheckListHeader } from './CheckListHeader'
import { CheckListModal } from './ChecklistModal'
import { CheckListMain } from './CheckListMain'

export const CheckList = ({ title }) => {
   const [showInputs, setShowInputs] = useState(false)
   const [items, setItems] = useState([])
   const [taskCount, setTaskCount] = useState(0)
   const [open, setOpen] = useState(false)
   const [editId, setEditId] = useState(false)
   const [editTitle, setEditTitle] = useState('')
   const [isTaskListVisible, setTaskListVisible] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const [itemToDeleteId, setItemToDeleteId] = useState(null)
   const [newItemValue, setNewItemValue] = useState('')

   const dispatch = useDispatch()

   const maxTaskCount = 5
   const isAddDisabled = taskCount >= maxTaskCount

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

   const openModal = (id) => {
      setItemToDeleteId(id)
      setShowModal(true)
   }

   useEffect(() => {
      dispatch(checkListGetRequest(24))
   })

   return (
      <ChecklistContainer>
         <CheckListHeader
            cancelAddItem={cancelAddItem}
            showInputs={showInputs}
            editId={editId}
            setEditTitle={setEditTitle}
            editTitle={editTitle}
            setEditId={setEditId}
            title={title}
            openModal={openModal}
            taskCount={taskCount}
            items={items}
         />

         {showInputs ? (
            <CheckListMain
               isAddDisabled={isAddDisabled}
               items={items}
               setItems={setItems}
               setTaskCount={setTaskCount}
               taskCount={taskCount}
               setTaskListVisible={setTaskListVisible}
               isTaskListVisible={isTaskListVisible}
               toggleCompleted={toggleCompleted}
               openModal={openModal}
               toggleInputs={toggleInputs}
               open={open}
               newItemValue={newItemValue}
               setNewItemValue={setNewItemValue}
            />
         ) : null}

         {showModal && (
            <CheckListModal
               itemToDeleteId={itemToDeleteId}
               removeItem={removeItem}
               setShowModal={setShowModal}
               setItemToDeleteId={setItemToDeleteId}
            />
         )}
      </ChecklistContainer>
   )
}

const ChecklistContainer = styled('div')({
   width: '100%',
   borderRadius: '5px',
   padding: '10px',
   marginBottom: '10px',
})
