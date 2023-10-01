import styled from '@mui/material/styles/styled'
import { Button as MuiButton } from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MapCommets = ({ handleEditClick, handleDeleteClick }) => {
   const navigate = useNavigate()
   const { comments } = useSelector((state) => state.comments)
   return (
      <div>
         {comments.length > 0 ? (
            <ScrollableContainer>
               {comments.map((comment, index) => {
                  const isLastItem = index === comments.length - 1
                  return (
                     <MainContainer isLastItem={isLastItem}>
                        <PersonIcon
                           src={comment.creatorAvatar}
                           onClick={() =>
                              navigate(`/profile/${comment.creatorId}`, {
                                 state: { edit: 'true' },
                              })
                           }
                           alt="Member"
                        />
                        <AboutComments>
                           <PostName
                              onClick={() =>
                                 navigate(`/profile/${comment.creatorId}`, {
                                    state: { edit: 'true' },
                                 })
                              }
                           >
                              {comment.creatorName}
                           </PostName>
                           <PostComments>{comment.comment}</PostComments>
                           <NecessaryContainer>
                              <PostDate>{comment.createdDate}</PostDate>
                              {comment.isMyComment && (
                                 <MyStyledBtnCont>
                                    <MyStyledBtn
                                       onClick={() =>
                                          handleEditClick(
                                             comment.commentId,
                                             comment.comment,
                                             comment.creatorId
                                          )
                                       }
                                    >
                                       edit
                                    </MyStyledBtn>
                                    <MyStyledBtn
                                       onClick={() =>
                                          handleDeleteClick(
                                             comment.commentId,
                                             comment.creatorId
                                          )
                                       }
                                    >
                                       delete
                                    </MyStyledBtn>
                                 </MyStyledBtnCont>
                              )}
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
   )
}
const MainContainer = styled('div')(({ isLastItem }) => ({
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   width: '100%',
   display: 'flex',
   alignItems: 'flex-start',
   justifyContent: 'space-between',
   padding: '0.7rem ',
   borderBottom: '2px solid #E4E4E4',

   ...(isLastItem && {
      borderBottom: 'none',
   }),
}))
const PersonIcon = styled('img')(() => ({
   width: '3.125rem',
   height: '3.125rem',
   borderRadius: '50%',
   marginRight: '0.7rem',
   cursor: 'pointer',
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
   color: '#000',
   fontFamily: 'CarePro',
   fontSize: '0.975rem',
   fontStyle: 'normal',
   fontWeight: '500',
   textTransform: 'capitalize',
   cursor: 'pointer',
   '&:hover': {
      color: '#13517b',
   },
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
   flex: 1,
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

const ScrollableContainer = styled('div')(() => ({
   width: '100%',
   height: 'fit-content',
   maxHeight: '25rem',
   padding: '0.7rem ',
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
