import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { UpIcon } from '../../../assets/icons'
import { Input } from '../input/Input'

export const CommentSectoin = ({ comments }) => {
   return (
      <GLobalContainer>
         <CommentsPanel>
            <p>Comments</p>
            <UpIcon />
         </CommentsPanel>
         <ScrollableContainer>
            {comments.map((el, index) => {
               const isLastItem = index === comments.length - 1
               return (
                  <MainContainer key={el.id} isLastItem={isLastItem}>
                     <PersonIcon src={el.img} alt="Member" />
                     <AboutComments>
                        <PostName>{el.name}</PostName>
                        <PostComments>{el.comment}</PostComments>
                        <NecessaryContainer>
                           <PostDate>{el.date}</PostDate>
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
   marginLeft: '30px',
   backgroundColor: '#F4F5F7',
   width: ' 24.9rem',
   padding: ' 0.75rem ',
   borderRadius: '0.5rem',
}))

const CommentsPanel = styled('div')(() => ({
   display: 'flex',
   gap: '16rem',
}))
const ScrollableContainer = styled('div')(() => ({
   height: ' 20rem ',
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
   gap: '0.5rem',
   padding: '0.7rem',
   borderBottom: '2px solid #E4E4E4',
   width: ' 22.5125rem',
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
