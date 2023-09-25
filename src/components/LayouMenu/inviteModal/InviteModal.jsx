/* eslint-disable eqeqeq */
import { styled, IconButton, TextField, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ExitIcon, LeftIcon } from '../../../assets/icons'
import { Button } from '../../UI/button/Button'
import { createInviteMember } from '../../../store/inviteMember/inviteThunk'

export const InviteNewParticipant = ({
   openInviteNewModal,
   openModalHandler,
}) => {
   const [selectedRole, setSelectedRole] = useState('')
   const { loading } = useSelector((state) => state.inviteMember)
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()
   const { boardId, id } = useParams()

   const createNewMember = () => {
      const newdata = {
         boardId,
         email,
         role: selectedRole === 'ADMIN' ? 'ADMIN' : 'MEMBER',
         link: `http://localhost:3000/mainPage/${id}/boards/${boardId}/board`,
      }

      dispatch(createInviteMember({ newdata, boardId, openInviteNewModal }))
   }
   return (
      <div>
         <Container>
            {loading ? (
               <CircularProgress />
            ) : (
               <InviteParticipantModal>
                  <InviteHeader>
                     <IconButton>
                        <LeftIcon fill="gray" onClick={openInviteNewModal} />
                     </IconButton>
                     <p>Invite a new participant</p>
                     <IconButton onClick={openModalHandler}>
                        <ExitIcon fill="gray" />
                     </IconButton>
                  </InviteHeader>
                  <InputEmail
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     label="example@gmail.com"
                     variant="outlined"
                     type="email"
                     size="small"
                  />
                  <MembersCont>
                     <MemberBox>
                        <input
                           type="radio"
                           id="contactChoice1"
                           checked={selectedRole == 'MEMBER'}
                           onChange={() => setSelectedRole('MEMBER')}
                        />
                        <label htmlFor="contactChoice1">Member</label>
                        <input
                           type="radio"
                           id="contactChoice2"
                           checked={selectedRole == 'ADMIN'}
                           onChange={() => setSelectedRole('ADMIN')}
                        />
                        <label htmlFor="contactChoice2">Admin</label>
                     </MemberBox>
                  </MembersCont>
                  <ButtonsCont>
                     <ButtonDelete onClick={openInviteNewModal}>
                        Cancel
                     </ButtonDelete>
                     <ButtonCreate onClick={createNewMember}>
                        Create
                     </ButtonCreate>
                  </ButtonsCont>
               </InviteParticipantModal>
            )}
         </Container>
      </div>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '25.5625rem',
   height: '12rem',
}))

const InviteParticipantModal = styled('div')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   padding: '1rem',
   boxSizing: 'border-box',
   backgroundColor: 'white',
   borderRadius: '0.5rem',
   position: 'fixed',
   zIndex: '9999',
})

const InviteHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const InputEmail = styled(TextField)({
   '& .MuiOutlinedInput-input': {
      borderRadius: '0.5rem',
      width: '19.8rem',
      padding: '0.575rem 1rem',
      backgroundColor: '#fff',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
      },
      '&:hover fieldset': {
         border: '1px solid #D0D0D0',
      },
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ' #D0D0D0',
   },
   '& .css-1qi90xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
   },
})

const MemberBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.7rem',
})

const MembersCont = styled('div')({
   display: 'flex',
   gap: '4rem',
})

const ButtonsCont = styled('div')({
   display: 'flex',
   justifyContent: 'end',
   gap: '1.5rem',
})

const ButtonDelete = styled(Button)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '0.8rem',
   width: '4.8125rem',
   backgroundColor: '#948f8f',
   '&:hover': {
      backgroundColor: '#737373',
   },
})

const ButtonCreate = styled(Button)({
   width: '4.8125rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '0.8rem',
   '&:hover': {
      backgroundColor: '#005688',
   },
})
