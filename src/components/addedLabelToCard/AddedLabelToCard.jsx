import React from 'react'
import { styled as muiStyled } from '@mui/material/styles'
// import { InputBase } from '@mui/material'
import { CloseIcon, EditIcon } from '../../assets/icons'

const Colors = [
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
   const [editState, setEditState] = React.useState(Colors.map(() => false))
   const [taskText, setTaskText] = React.useState(
      Colors.map((color) => color.text)
   )

   const onEditHandler = (index) => {
      setEditState((prevState) => {
         const updatedState = [...prevState]
         updatedState[index] = !prevState[index]
         return updatedState
      })
   }

   const onEditTask = (event, index) => {
      const updatedTaskText = [...taskText]
      updatedTaskText[index] = event.target.value
      setTaskText(updatedTaskText)
   }

   const onClickKey = (event, index) => {
      if (event.key === 'Enter') {
         setEditState((prevState) => {
            const updatedState = [...prevState]
            updatedState[index] = false
            return updatedState
         })

         if (taskText[index] === '') {
            setTaskText((prevTaskText) => {
               const updatedTaskText = [...prevTaskText]
               updatedTaskText[index] = 'Done'
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
            {Colors.map((color, index) => (
               <WrapperTask key={color.id}>
                  {editState[index] ? (
                     <StyledInputBase
                        onKeyPress={(e) => onClickKey(e, index)}
                        style={color}
                        value={taskText[index]}
                        onChange={(e) => onEditTask(e, index)}
                        onBlur={() =>
                           setEditState((prevState) => {
                              const updatedState = [...prevState]
                              updatedState[index] = false
                              return updatedState
                           })
                        }
                     />
                  ) : (
                     <>
                        <Task key={color.id} style={color}>
                           {taskText[index]}
                        </Task>
                        <EditIcon
                           src={EditIcon}
                           onClick={() => onEditHandler(index)}
                        />
                     </>
                  )}
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
   backgroundColor: 'black',
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
   fontSize: '16px',
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
   fontSize: '16px',
   fontWeight: '500',
   color: '#fff',
}))

const StyledInputBase = muiStyled('input')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '292px',
   padding: '6px 0 6px 16px',
   borderRadius: '6px',
   margin: '4px 10px 4px 0',
   fontSize: '16px',
   fontWeight: '500',
   color: '#fff',
   border: 'none',
   outline: 'none',
}))
