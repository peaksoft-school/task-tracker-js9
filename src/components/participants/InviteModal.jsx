/* eslint-disable eqeqeq */
import { styled, IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { ExitIcon, LeftIcon } from '../../assets/icons'
import { Button } from '../UI/button/Button'
import { postParticipans } from '../../store/participants/partThunk'
import { ModalUi } from '../UI/modal/Modal'
import { showSnackbar } from '../UI/snackbar/Snackbar'

export const InviteNewParticipant = ({ onCreateClick, rows }) => {
   const [selectedRole, setSelectedRole] = useState('')
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()
   const { partId } = useParams()
   const createNewMember = () => {
      if (!rows.find((item) => item.email === email)) {
         const newdata = {
            workSpacesId: Number(partId),
            email,
            role: selectedRole === 'ADMIN' ? 'ADMIN' : 'MEMBER',
            link: 'http://localhost:3000/signup',
         }
         dispatch(postParticipans(newdata))
         onCreateClick()
      } else {
         showSnackbar({
            message: 'user already added',
            severity: 'info',
         })
      }
   }

   return (
      <ModalUi open={onCreateClick} onClose={onCreateClick}>
         <InviteParticipantModal>
            <InviteHeader>
               <IconButton>
                  <LeftIcon fill="gray" onClick={onCreateClick} />
               </IconButton>
               <p>Invite a new participant</p>
               <IconButton>
                  <ExitIcon fill="gray" onClick={onCreateClick} />
               </IconButton>
            </InviteHeader>
            <div>
               <InputEmail
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  type="email"
               />
            </div>
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
               <ButtonDelete disabled={!email} onClick={() => setEmail('')}>
                  Delete
               </ButtonDelete>
               <ButtonCreate onClick={createNewMember}>Create</ButtonCreate>
            </ButtonsCont>
         </InviteParticipantModal>
      </ModalUi>
   )
}

const InviteParticipantModal = styled('div')({
   width: '26.5625rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   padding: '1rem',
   boxSizing: 'border-box',
   backgroundColor: 'white',
   borderRadius: '0.5rem',
})

const InviteHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const InputEmail = styled('input')({
   width: '24.0625rem',
   height: '2rem',
   borderRadius: '0.5rem',
   border: '1px solid grey',
   padding: '0.375rem 1rem',
   boxSizing: 'border-box',
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
   '&:hover': {
      backgroundColor: '#171bea',
   },
})

const ButtonCreate = styled(Button)({
   width: '4.8125rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '0.8rem',
   '&:hover': {
      backgroundColor: '#171bea',
   },
})
