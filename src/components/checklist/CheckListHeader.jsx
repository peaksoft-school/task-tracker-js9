import React, { useState } from 'react'
import { styled, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon, DownIcon, EditIcon, UpIcon } from '../../assets/icons'
import { Button } from '../UI/button/Button'
import { checkListPutRequest } from '../../store/checkList/CheckListThunk'

export const CheckListHeader = ({
   cancelAddItem,
   showInputs,
   editId,
   editTitle,
   setEditTitle,
   setEditId,
   title,
   openModal,
   items,
   taskCount,
}) => {
   const [edit] = useState([])
   const [state, setState] = useState(false)
   const { item } = useSelector((state) => state.checkList)
   console.log('item: ', item)

   const dispatch = useDispatch()

   const getProgress = () => {
      if (items.length === 0) {
         return 0
      }
      const completedCount = items.filter((item) => item.completed).length
      return Math.floor((completedCount / items.length) * 100)
   }

   const saveHandler = () => {
      const newData = {
         title: editTitle,
         checkListId: item.checkListId,
         percent: getProgress(),
         counter: taskCount.toString(),
         itemResponseList: items.map((item) => ({
            itemId: item.id,
            title: item.value,
            isDone: item.completed,
         })),
      }

      dispatch(
         checkListPutRequest({
            checkListId: item.checkListId,
            data: newData,
         })
      )
      setEditId(false)
   }

   const editHandler = (title) => {
      setEditTitle(title)
      setEditId(true)
      setState(true)
   }

   return (
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
                           {edit.map((e) => (
                              <Title key={item.checkListId}>{e.title}</Title>
                           ))}
                        </Title>
                     ) : (
                        <Title>
                           {item.map((e) => (
                              <Title key={item.checkListId}>{e.title}</Title>
                           ))}
                        </Title>
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
                  {item.map((e) => (
                     <span>{e.counter}</span>
                  ))}
               </p>
            </TaskCountContainer>
            <ProgressLine>
               <ProgressBar progress={getProgress()} />
            </ProgressLine>
            {item.map((e) => (
               <ProgressLabel>{e.percent}%</ProgressLabel>
            ))}
         </ProgressContainer>
      </CheckListHeaderContainer>
   )
}

const StyledIconButton = styled(IconButton)({
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',
   gap: '0.25rem',
})

const CheckListHeaderContainer = styled('div')({
   width: '41.875rem',
})

const ChecklistHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const CheckListBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
})

const EditInput = styled('input')({
   width: '6rem',
   height: '1.5rem',
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
const Title = styled('p')({
   fontSize: '1rem',
   color: '#111',
   fontFamily: 'CarePro',
   fontWeight: '400',
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

const ProgressContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginTop: '0.5rem',
   borderRadius: '0.5rem',
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
