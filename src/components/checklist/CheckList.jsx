import React, { useState } from 'react'
import { IconButton, Checkbox, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import { UpIcon, DownIcon } from '../../assets/icons'

const ChecklistContainer = styled('div')({
   border: '1px solid #ccc',
   borderRadius: '5px',
   padding: '10px',
   marginBottom: '10px',
})

const ChecklistHeader = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '10px',
})

const Title = styled('p')({
   margin: '0 10px',
})

const ProgressLine = styled('div')({
   height: '10px',
   borderRadius: '5px',
   backgroundColor: '#ccc',
})

const ProgressBar = styled('div')(({ progress }) => ({
   height: '100%',
   borderRadius: '5px',
   backgroundColor: '#007bff',
   width: `${progress}%`,
}))

const ProgressLabel = styled('span')({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   fontSize: '12px',
})

const InputContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '10px',
})

const ActionButtonsContainer = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
})

export const CheckList = ({ title }) => {
   const [showInputs, setShowInputs] = useState(false)
   const [items, setItems] = useState([])
   const [idCounter, setIdCounter] = useState(0)
   const [newItemValue, setNewItemValue] = useState('')

   const handleNewItemChange = (e) => {
      setNewItemValue(e.target.value)
   }

   const addItem = () => {
      const newItem = {
         id: idCounter,
         value: newItemValue,
         completed: false,
      }
      setItems([...items, newItem])
      setIdCounter(idCounter + 1)
      setNewItemValue('')
      setShowInputs(false)
   }

   const cancelAddItem = () => {
      setNewItemValue('')
      setShowInputs(false)
   }

   const handleItemChange = (id, value) => {
      const updatedItems = items.map((item) =>
         item.id === id ? { ...item, value } : item
      )
      setItems(updatedItems)
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
   }

   const getProgress = () => {
      if (items.length === 0) {
         return 0
      }

      const completedCount = items.filter((item) => item.completed).length
      return Math.floor((completedCount / items.length) * 100)
   }

   const toggleInputs = () => {
      setShowInputs(!showInputs)
   }

   return (
      <ChecklistContainer>
         <ChecklistHeader>
            <IconButton onClick={toggleInputs}>
               {showInputs ? <DownIcon /> : <UpIcon />}
            </IconButton>
            <IconButton>
               <EditIcon />
            </IconButton>
            <Title>{title}</Title>
         </ChecklistHeader>
         <ProgressLine>
            <ProgressBar progress={getProgress()} />
            <ProgressLabel>{getProgress()}%</ProgressLabel>
         </ProgressLine>
         {showInputs ? (
            <>
               <InputContainer>
                  <Checkbox checked={false} />
                  <StyledInput
                     type="text"
                     value={newItemValue}
                     onChange={handleNewItemChange}
                  />
               </InputContainer>
               <ActionButtonsContainer>
                  <Button onClick={addItem}>Add</Button>
                  <Button onClick={cancelAddItem}>Cancel</Button>
               </ActionButtonsContainer>
            </>
         ) : (
            <div>
               <Button onClick={toggleInputs}>Add New Item</Button>
            </div>
         )}
         {items.map((item) => (
            <div key={item.id}>
               <Checkbox
                  checked={item.completed}
                  onChange={() => toggleCompleted(item.id)}
               />
               <StyledInput
                  type="text"
                  value={item.value}
                  onChange={(e) => handleItemChange(item.id, e.target.value)}
               />
               <IconButton onClick={() => removeItem(item.id)}>
                  <DeleteIcon />
               </IconButton>
            </div>
         ))}
      </ChecklistContainer>
   )
}

const StyledInput = styled(Input)({
   input: {
      height: '100px',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '5px',
      padding: '10px',
      border: '1px solid #ccc',
      marginBottom: '10px',
   },
})
