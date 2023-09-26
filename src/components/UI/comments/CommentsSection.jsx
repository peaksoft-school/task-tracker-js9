import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'

import { styled } from '@mui/material/styles'
import { useNavigate, useParams } from 'react-router-dom'
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
import { MapCommets } from './comments-part/MapCommets'
import CommentDelete from './comments-part/CommentDelete'
import { CommentsUpdate } from './comments-part/CommentsUpdate'

export const CommentSection = ({ setShowMore, showMore }) => {
   const [commentText, setCommentText] = useState('')
   const [editingCommentId, setEditingCommentId] = useState(null)
   const [editedCommentText, setEditedCommentText] = useState('')
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [deleteCommentId, setDeleteCommentId] = useState(null)
   const [showEditModal, setShowEditModal] = useState(false)
   const [clickedCommentData, setClickedCommentData] = useState(null)

   const { comments } = useSelector((state) => state.comments)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { cardId } = useParams()

   const toggleComments = () => {
      setShowMore((prevShowComments) => !prevShowComments)
   }

   const handleDeleteClick = (commentId) => {
      setDeleteCommentId(commentId)
      setShowDeleteModal(true)
   }
   useEffect(() => {
      dispatch(getAllComments())
   }, [dispatch])

   const handleCommentSubmit = (e) => {
      e.preventDefault()

      dispatch(
         postComments({
            comment: commentText,
            cardId,
         })
      )

      setCommentText('')
   }

   const getCommentsID = (commentId) => {
      dispatch(getCommentsbyId({ commentId, navigate }))
   }

   const handleEditClick = (commentId, commentText) => {
      const clickedComment = comments.find(
         (comment) => comment.commentId === commentId
      )
      if (clickedComment) {
         setClickedCommentData(clickedComment)
         setEditingCommentId(commentId)
         setEditedCommentText(commentText)
         setShowEditModal(true)
      }
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

   const handleCloseDeleteModal = () => {
      setShowDeleteModal(false)
      setDeleteCommentId(null)
   }

   return (
      <div>
         <GLobalContainer>
            <CommentsPanel>
               <p>Comments</p>
               <IconButton
                  style={{ marginTop: '-0.3rem' }}
                  onClick={toggleComments}
               >
                  {showMore ? <DownIcon /> : <UpIcon />}
               </IconButton>
            </CommentsPanel>

            {showMore ? (
               <div>
                  <MapCommets
                     getCommentsID={getCommentsID}
                     handleEditClick={handleEditClick}
                     handleDeleteClick={handleDeleteClick}
                  />
               </div>
            ) : null}
            <FormContainer onSubmit={handleCommentSubmit}>
               <StyledInput
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Write a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
               />
            </FormContainer>
            <CommentDelete
               showDeleteModal={showDeleteModal}
               handleCloseDeleteModal={handleCloseDeleteModal}
               deleteCommentId={deleteCommentId}
               deleteComment={deleteComment}
               dispatch={dispatch}
            />
            <CommentsUpdate
               showEditModal={showEditModal}
               clickedCommentData={clickedCommentData}
               setShowEditModal={setShowEditModal}
               editedCommentText={editedCommentText}
               handleSaveClick={handleSaveClick}
               setEditedCommentText={setEditedCommentText}
            />
         </GLobalContainer>
      </div>
   )
}
const GLobalContainer = styled('div')(() => ({
   backgroundColor: '#F4F5F7',
   width: ' 24.9rem',
   // margin: '0 5rem',
   padding: ' 0.9rem 0.75rem ',
   borderRadius: '0.5rem',
}))

const CommentsPanel = styled('div')(() => ({
   display: 'flex',
   gap: '16rem',
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
