import React, { useEffect, useState } from 'react'
import {
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   Button as MuiButton,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../input/Input'
import { UpIcon, DownIcon } from '../../../assets/icons'
import {
   deleteComment,
   editComment,
   getAllComments,
   getCommentsbyId,
   postComments,
} from '../../../store/crud-comments/commentsThunk'
import { ModalUi } from '../modal/Modal'

export const CommentSection = () => {
   const [showMore, setShowMore] = useState(false)
   const [commentText, setCommentText] = useState('')
   const [editingCommentId, setEditingCommentId] = useState(null)
   const [editedCommentText, setEditedCommentText] = useState('')
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [deleteCommentId, setDeleteCommentId] = useState(null)
   const [showEditModal, setShowEditModal] = useState(false)

   const { comments } = useSelector((state) => state.comments)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const toggleComments = () => {
      setShowMore((prevShowComments) => !prevShowComments)
   }

   useEffect(() => {
      dispatch(getAllComments())
   }, [dispatch])

   const handleCommentSubmit = (e) => {
      e.preventDefault()

      dispatch(
         postComments({
            comment: commentText,
            cardId: 22,
         })
      )
      dispatch(getAllComments())

      setCommentText('')
   }

   const getCommentsID = (id) => {
      dispatch(getCommentsbyId({ id, navigate, path: 'profile' }))
   }

   const handleEditClick = (commentId, commentText) => {
      setEditingCommentId(commentId)
      setEditedCommentText(commentText)
      setShowEditModal(true)
   }

   const handleSaveClick = () => {
      dispatch(
         editComment({
            commentId: editingCommentId,
            comment: editedCommentText,
         })
      )
      setShowEditModal(false)

      setEditingCommentId(null)
      setEditedCommentText('')
   }

   const handleDeleteClick = (commentId) => {
      setDeleteCommentId(commentId)
      setShowDeleteModal(true)
   }

   const handleCloseDeleteModal = () => {
      setShowDeleteModal(false)
      setDeleteCommentId(null)
   }

   return (
      <GLobalContainer key={comments.id}>
         <CommentsPanel>
            <p>Comments</p>
            <IconButton
               style={{ marginTop: '-0.3rem' }}
               onClick={toggleComments}
            >
               {showMore ? <DownIcon /> : <UpIcon />}
            </IconButton>
         </CommentsPanel>
         {showMore && (
            <div>
               {comments.length > 0 ? (
                  <ScrollableContainer>
                     {comments.map((comments, index) => {
                        const isLastItem = index === comments.length - 1
                        return (
                           <MainContainer
                              key={comments.id}
                              isLastItem={isLastItem}
                              onClick={getCommentsID()}
                           >
                              <PersonIcon
                                 src={comments.creatorAvatar}
                                 alt="Member"
                              />
                              <AboutComments>
                                 <PostName>{comments.creatorName}</PostName>
                                 <PostComments>{comments.comment}</PostComments>
                                 <NecessaryContainer>
                                    <PostDate>{comments.createdDate}</PostDate>
                                    <MyStyledBtnCont>
                                       <MyStyledBtn
                                          onClick={() =>
                                             handleEditClick(
                                                comments.commentId,
                                                comments.comment
                                             )
                                          }
                                       >
                                          edit
                                       </MyStyledBtn>
                                       <ModalUi
                                          open={showEditModal}
                                          onClose={() =>
                                             setShowEditModal(false)
                                          }
                                          key={comments.id}
                                       >
                                          <div
                                             style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                             }}
                                          >
                                             <PersonIcon
                                                src={comments.creatorAvatar}
                                                alt="Member"
                                             />
                                             <PostName>
                                                {comments.creatorName}
                                             </PostName>
                                          </div>
                                          <DialogContent>
                                             <StyledInput
                                                placeholder="Edit your comment"
                                                value={editedCommentText}
                                                onChange={(e) =>
                                                   setEditedCommentText(
                                                      e.target.value
                                                   )
                                                }
                                             />
                                          </DialogContent>
                                          <DialogActions>
                                             <Button
                                                onClick={() =>
                                                   setShowEditModal(false)
                                                }
                                             >
                                                Cancel
                                             </Button>
                                             <Button onClick={handleSaveClick}>
                                                Save
                                             </Button>
                                          </DialogActions>
                                       </ModalUi>
                                       <MyStyledBtn
                                          onClick={() =>
                                             handleDeleteClick(
                                                comments.commentId
                                             )
                                          }
                                       >
                                          delete
                                       </MyStyledBtn>
                                    </MyStyledBtnCont>
                                 </NecessaryContainer>
                              </AboutComments>
                           </MainContainer>
                        )
                     })}
                  </ScrollableContainer>
               ) : (
                  <NoCommentsComtainer>
                     <NoCommentsDescription>No comments</NoCommentsDescription>
                  </NoCommentsComtainer>
               )}
            </div>
         )}

         <FormContainer onSubmit={handleCommentSubmit}>
            <StyledInput
               id="outlined-basic"
               variant="outlined"
               placeholder="Write a comment"
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
            />
         </FormContainer>
         <ModalUi open={showDeleteModal} onClose={handleCloseDeleteModal}>
            <DialogTitle style={{ textAlign: 'center', fontFamily: 'CarePro' }}>
               Delete comment?
            </DialogTitle>
            <DialogContent>
               Deleting a comment is forever. There is no undo.
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDeleteModal}>Cancel</Button>
               <Button
                  onClick={() => {
                     dispatch(deleteComment(deleteCommentId))
                     handleCloseDeleteModal()
                  }}
                  color="error"
               >
                  Delete
               </Button>
            </DialogActions>
         </ModalUi>
      </GLobalContainer>
   )
}

const GLobalContainer = styled('div')(() => ({
   backgroundColor: '#F4F5F7',
   width: ' 24.9rem',
   margin: '0 5rem',
   padding: ' 0.9rem 0.75rem ',
   borderRadius: '0.5rem',
}))

const CommentsPanel = styled('div')(() => ({
   display: 'flex',
   gap: '16rem',
}))
const ScrollableContainer = styled('div')(() => ({
   width: '100%',
   height: ' 25rem ',
   overflowY: 'auto ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #d9d9d9 transparent',

   ' &::-webkit-scrollbar ': {
      width: '0.5rem',
   },

   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },

   ' &::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #d9d9d9',
      borderRadius: '0.25rem',
   },
}))
const MainContainer = styled('div')(({ isLastItem }) => ({
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   width: '100%',
   display: 'flex',
   // gap: '0.8rem',
   alignItems: 'flex-start',
   justifyContent: 'space-between',
   padding: '0.7rem ',
   borderBottom: '2px solid #E4E4E4',

   ...(isLastItem && {
      borderBottom: 'none',
   }),
}))

const FormContainer = styled('form')(() => ({
   backgroundColor: '#F4F5F7',
   padding: '0.8rem 0.5rem 0.5rem 0.5rem',
}))

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
const PersonIcon = styled('img')(() => ({
   width: '3.125rem',
   height: '3.125rem',
   borderRadius: '50%',
   marginRight: '0.7rem',
}))

const PostDate = styled('p')(() => ({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.75rem',
   fontStyle: 'normal',
   fontWeight: '400',
   width: '150px',
}))

const PostName = styled('p')(() => ({
   color: '#111',
   fontFamily: 'CarePro',
   fontSize: '0.975rem',
   fontStyle: 'normal',
   fontWeight: '400',
   textTransform: 'capitalize',
}))

const PostComments = styled('p')(() => ({
   color: '#616161',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   wordWrap: 'break-word',
}))

const AboutComments = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.6rem',
}))

const NecessaryContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const MyStyledBtn = styled(MuiButton)(() => ({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.8rem',
   fontWeight: ' 500',
   textDecoration: 'underline',
   borderRadius: '100%',
   padding: '0',
   '&:hover': {
      background: '#F4F5F7',
      color: '#434343',
   },
   '&:active': {
      background: '#F4F5F7',
      color: '#919191',
      textDecoration: 'underline',
   },
}))

const MyStyledBtnCont = styled('div')(() => ({
   display: 'flex',
}))

const NoCommentsComtainer = styled('div')(() => ({
   padding: '1rem ',
   display: 'flex ',
   justifyContent: 'center',
}))

const NoCommentsDescription = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1.2rem',
   fontWeight: '600',
   color: '#5f5f5f',
}))
