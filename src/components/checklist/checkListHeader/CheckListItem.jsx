import { IconButton, styled, Button } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon, DownIcon, EditIcon, UpIcon } from '../../../assets/icons'
import {
   checkListPutRequest,
   deleteListInLists,
} from '../../../store/checkList/CheckListThunk'
import { CheckListModal } from '../checkListModal/ChecklistModal'

const CheckListItem = ({ cancelAddItem, showInputs, title, id }) => {
   const { checkListData } = useSelector((state) => state.checkList)
   const { carId } = useParams()
   const dispatch = useDispatch()

   const [showModal, setShowModal] = useState(false)
   const [editId, setEditId] = useState(false)
   const [editTitle, setEditTitle] = useState('')

   const saveHandler = () => {
      const newData = {
         title: editTitle,
         checkListId: id,
         itemResponseList: checkListData.itemResponseList,
         carId,
      }

      dispatch(checkListPutRequest(newData))

      setEditId(false)
   }

   const editHandler = (title) => {
      setEditTitle(title)
      setEditId(true)
   }

   const closeModal = () => {
      setShowModal(false)
   }

   const openModal = () => {
      setShowModal(true)
   }

   const deleteList = () => {
      const data = {
         id,
         carId,
      }
      dispatch(deleteListInLists(data))
   }

   return (
      <>
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
                     <StyledIconButton onClick={() => editHandler(title)}>
                        <EditIcon />
                     </StyledIconButton>

                     <Title>{title}</Title>
                  </>
               )}
            </CheckListBox>
            <DeleteBox>
               <IconButton onClick={openModal}>
                  <DeleteIcon />
               </IconButton>
               <p>Delete</p>
            </DeleteBox>
         </ChecklistHeader>
         {checkListData.map((checkListItem) => {
            if (checkListItem.checkListId === id) {
               return (
                  <ProgressContainer key={checkListItem.id}>
                     <TaskCountContainer>
                        <div>
                           <span>{checkListItem.counter}</span>
                        </div>
                     </TaskCountContainer>
                     <ProgressBarContainer>
                        <ProgressBarBackground>
                           <ProgressBarFill progress={checkListItem.percent} />
                        </ProgressBarBackground>
                     </ProgressBarContainer>
                     <ProgressLabel>{checkListItem.percent}%</ProgressLabel>
                  </ProgressContainer>
               )
            }
            return null
         })}

         {showModal && (
            <CheckListModal
               showModal={showModal}
               deleteHandler={deleteList}
               closeModal={closeModal}
            />
         )}
      </>
   )
}
export default CheckListItem

const StyledIconButton = styled(IconButton)({
   height: '1.875rem',
   borderRadius: '0.5rem',
   border: '0.0625rem',

   gap: '0.25rem',
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
   width: '2rem',
   height: '1.5rem',
   fontSize: '0.6rem',
   marginLeft: '1rem',
   marginRight: '0.5rem',
   paddingTop: '0.3rem',
   borderRadius: '0.5rem',
   '&:hover': {
      backgroundColor: '#cccfd1',
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
   borderRadius: '0.5rem',

   '&:hover': {
      backgroundColor: '#cecfd0',
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

const ProgressLabel = styled('span')({
   fontSize: '1rem',
   marginLeft: '0.63rem',
   color: '#787878',
   fontFamily: 'Gilroy',
   fontWeight: '400',
})

const ProgressBarContainer = styled('div')({
   height: '0.625rem',
   borderRadius: '5px',
   backgroundColor: '#ccc',
   flex: 1,
   overflow: 'hidden',
})

const ProgressBarBackground = styled('div')({
   height: '100%',
   borderRadius: '5px',
   width: '100%',
})

const ProgressBarFill = styled('div')(({ progress }) => ({
   height: '100%',
   width: `${progress}%`,
   backgroundColor: '#007bff',
   borderRadius: '5px',
   transition: '0.7s',
}))
