import React from 'react'
import { DialogActions, DialogContent, styled } from '@mui/material'
import { Input } from '../../input/Input'
import { ModalUi } from '../../modal/Modal'
import { Button } from '../../button/Button'

export const CommentsUpdate = React.memo(
   ({
      showEditModal,
      clickedCommentData,
      setShowEditModal,
      editedCommentText,
      handleSaveClick,
      setEditedCommentText,
   }) => {
      return (
         <ModalUi open={showEditModal} onClose={() => setShowEditModal(false)}>
            {clickedCommentData && (
               <>
                  <ContainerForPersonIcon>
                     <PersonIcon
                        src={clickedCommentData.creatorAvatar}
                        alt="Member"
                     />
                     <PostName>{clickedCommentData.creatorName}</PostName>
                  </ContainerForPersonIcon>
                  <DialogContent>
                     <StyledInput
                        placeholder="Edit your comment"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                     />
                  </DialogContent>
                  <DialogActions style={{ marginRight: '0.8rem' }}>
                     <StyledButton onClick={() => setShowEditModal(false)}>
                        Cancel
                     </StyledButton>

                     <StyledSaveButton onClick={handleSaveClick}>
                        Save
                     </StyledSaveButton>
                  </DialogActions>
               </>
            )}
         </ModalUi>
      )
   }
)

const StyledInput = styled(Input)(() => ({
   input: {
      display: 'flex',
      width: '20rem',
      fontFamily: 'CarePro',
      height: '1.7rem',
      borderRadius: '0.5rem',
      background: '#F4F5F7',
      '&:hover .MuiOutlinedInput-notchedOutline': {
         borderColor: '#0079BF',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
         borderColor: '#919191',
      },
   },
   '& .MuiInputBase-input.MuiOutlinedInput-input': {
      padding: '0.5rem 1rem',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D0D0D0',
   },
}))

const ContainerForPersonIcon = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
}))
const PersonIcon = styled('img')(() => ({
   width: '3.125rem',
   height: '3.125rem',
   borderRadius: '50%',
   marginRight: '0.7rem',
}))
const PostName = styled('p')(() => ({
   color: '#111',
   fontFamily: 'CarePro',
   fontSize: '1.2rem',
   fontStyle: 'normal',
   fontWeight: '500',
   textTransform: 'capitalize',
}))

const StyledButton = styled(Button)(() => ({
   padding: ' 0.375rem 1rem',
   backgroundColor: '#F0F0F0',
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.9rem',
   fontWeight: 500,
   '&:hover': {
      backgroundColor: '#bfbfbf',
      color: '#282727',
   },
}))

const StyledSaveButton = styled(Button)(() => ({
   padding: ' 0.375rem 1rem',
   backgroundColor: '#0079BF',
   color: '#fff',
   fontFamily: 'CarePro',
   fontSize: '0.9rem',
   fontWeight: 500,
   '&:hover': {
      backgroundColor: '#52c0ff',
   },
}))
