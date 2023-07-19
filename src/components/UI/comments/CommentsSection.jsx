import React from 'react'
import { Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Input } from '../input/Input'
import { UpIcon, DownIcon } from '../../../assets/icons'

export const CommentSection = ({ comments, showMore, setShowMore }) => {
   const toggleComments = () => {
      setShowMore((prevShowComments) => !prevShowComments)
   }

   return (
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
                           >
                              <PersonIcon src={comments.img} alt="Member" />
                              <AboutComments>
                                 <PostName>{comments.name}</PostName>
                                 <PostComments>{comments.comment}</PostComments>
                                 <NecessaryContainer>
                                    <PostDate>{comments.date}</PostDate>
                                    <MyStyledBtnCont>
                                       <MyStyledBtn>edit</MyStyledBtn>
                                       <MyStyledBtn>delete</MyStyledBtn>
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

         <FormContainer>
            <StyledInput
               id="outlined-basic"
               variant="outlined"
               placeholder="Write a comment"
            />
         </FormContainer>
      </GLobalContainer>
   )
}

const GLobalContainer = styled('div')(() => ({
   backgroundColor: '#F4F5F7',
   width: ' 24.9rem',

   padding: ' 0.9rem 0.75rem ',
   borderRadius: '0.5rem',
}))

const CommentsPanel = styled('div')(() => ({
   display: 'flex',
   gap: '16rem',
}))
const ScrollableContainer = styled('div')(() => ({
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
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0.7rem',
   borderBottom: '2px solid #E4E4E4',
   width: ' 22.8rem',

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
}))

const PostComments = styled('p')(() => ({
   color: '#616161',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
}))

const AboutComments = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.6rem',
}))

const NecessaryContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
}))

const MyStyledBtn = styled(Button)(() => ({
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