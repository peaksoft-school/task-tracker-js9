import React from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import { CloseIcon, EditIcon } from '../../assets/icons'

const Labels = [
   {
      id: 1,
      backgroundColor: '#61BD4F',
      text: 'Done',
   },
   {
      id: 2,
      backgroundColor: 'rgba(235, 90, 70, 1)',
      text: 'In progress',
   },
   {
      id: 3,
      backgroundColor: 'rgba(242, 214, 0, 1)',
      text: 'Done',
   },
   {
      id: 4,
      backgroundColor: 'rgba(0, 121, 191, 1)',
      text: 'Done',
   },
]

export const AddedLabelToCard = () => {
   const [editState, setEditState] = React.useState(Labels.map(() => false))
   const [taskText, setTaskText] = React.useState(
      Labels.map((color) => color.text)
   )

   const onEditHandler = (idx) => {
      setEditState((prev) => {
         return prev.map((state, i) => i === idx)
      })
   }

   const onEditTask = (event, idx) => {
      const updatedTaskText = [...taskText]
      updatedTaskText[idx] = event.target.value
      setTaskText(updatedTaskText)
   }

   const onClickKey = (event, idx) => {
      if (event.key === 'Enter') {
         setEditState((prev) => {
            const updatedState = [...prev]
            updatedState[idx] = false
            return updatedState
         })

         if (taskText[idx] === '') {
            setTaskText((prev) => {
               const updatedTaskText = [...prev]
               updatedTaskText[idx] = 'Done'
               return updatedTaskText
            })
         }
      }
   }

   return (
      <Container>
         <Wrapper>
            <WrapperTitle>
               <Title>Label</Title>
               <CloseIcon style={{ display: 'inline-block' }} src={CloseIcon} />
            </WrapperTitle>
            {Labels.map((color, idx) => (
               <WrapperTask key={color.id}>
                  {editState[idx] ? (
                     <StyledInputBase
                        onKeyPress={(e) => onClickKey(e, idx)}
                        id={color.id}
                        style={color}
                        value={taskText[idx]}
                        onChange={(e) => onEditTask(e, idx)}
                        placeholder="empty"
                     />
                  ) : (
                     <Task key={color.id} style={color}>
                        {taskText[idx]}
                     </Task>
                  )}
                  <label htmlFor={color.id}>
                     <EditIcon
                        src={EditIcon}
                        onClick={() => onEditHandler(idx)}
                     />
                  </label>
               </WrapperTask>
            ))}
         </Wrapper>
      </Container>
   )
}

const Container = muiStyled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100vh',
   backgroundColor: 'rgba(0, 0, 0, 0.3)',
}))

const Wrapper = muiStyled('div')(() => ({
   width: '367px',
   height: '224px',
   borderRadius: '10px',
   padding: '18px 20px 16px',
   backgroundColor: '#fff',
}))

const WrapperTitle = muiStyled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   alignItems: 'center',
   marginBottom: '12px',
}))

const Title = muiStyled('h4')(() => ({
   fontFamily: 'sans-serif',
   fontWeight: '400',
   marginRight: '120px',
}))

const WrapperTask = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Task = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '297px',
   padding: '6px 0 6px 16px',
   borderRadius: '6px',
   margin: '4px 10px 4px 0',
   fontWeight: '500',
   color: '#fff',
}))

const StyledInputBase = muiStyled('input')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '292px',
   padding: '7px 0 7px 16px',
   borderRadius: '6px',
   margin: '4px 10px 4px 0',
   fontWeight: '500',
   color: '#fff',
   border: 'none',
   '&:focus': {
      outline: '1px solid rgba(0, 0, 0, 0.6)',
   },
   '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '14px',
   },
}))
