import React from 'react'
import {
   DialogActions,
   DialogContent,
   DialogTitle,
   styled,
} from '@mui/material'
import { ModalUi } from '../../modal/Modal'
import { Button } from '../../button/Button'

const CommentDelete = ({
   showDeleteModal,
   handleCloseDeleteModal,
   dispatch,
   deleteComment,
   deleteCommentId,
}) => {
   return (
      <ModalUi open={showDeleteModal} onClose={handleCloseDeleteModal}>
         <DialogTitle style={{ textAlign: 'center', fontFamily: 'CarePro' }}>
            Delete comment?
         </DialogTitle>
         <DialogContent>
            Deleting a comment is forever. There is no undo.
         </DialogContent>
         <DialogActions>
            <StyledButton
               onClick={() => {
                  dispatch(deleteComment(deleteCommentId))
                  handleCloseDeleteModal()
               }}
               color="error"
            >
               Delete
            </StyledButton>
         </DialogActions>
      </ModalUi>
   )
}

export default CommentDelete

const StyledButton = styled(Button)(() => ({
   width: '23rem',
   marginRight: '0.6rem',
   padding: ' 0.375rem 1rem',
   backgroundColor: '#D91212',
   color: '#ffff',
   fontFamily: 'CarePro',
   fontSize: '1.01rem',
   letterSpacing: '0.3rem',
   fontWeight: 'bold',
   '&:hover': {
      backgroundColor: '#ff8787aa',
      color: '#ff0000',
   },
}))
