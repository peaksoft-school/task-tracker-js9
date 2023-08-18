import { styled, IconButton } from '@mui/material'
import { useState } from 'react'
import {
   ExitIcon,
   RadioEmptyIcon,
   RadioFilledIcon,
} from '../../../assets/icons'
import { Button } from '../../UI/button/Button'

export const InviteNewParticipant = ({ openInviteNewModal }) => {
   const [isMemberSelected, setIsMemberSelected] = useState(false)
   const [isAdminSelected, setIsAdminSelected] = useState(false)
   const [email, setEmail] = useState('')

   const toggleMemberSelection = () => {
      setIsMemberSelected((prev) => !prev)
   }

   const toggleAdminSelection = () => {
      setIsAdminSelected((prev) => !prev)
   }
   return (
      <div>
         <InviteParticipantModal>
            <InviteHeader>
               <p>{}</p>
               <p>Invite a new participant</p>
               <IconButton>
                  <ExitIcon onClick={openInviteNewModal} />
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
                  {isMemberSelected ? (
                     <RadioFilledIcon onClick={toggleMemberSelection} />
                  ) : (
                     <RadioEmptyIcon onClick={toggleMemberSelection} />
                  )}

                  <p>Member</p>
               </MemberBox>
               <MemberBox>
                  {isAdminSelected ? (
                     <RadioEmptyIcon onClick={toggleAdminSelection} />
                  ) : (
                     <RadioFilledIcon onClick={toggleAdminSelection} />
                  )}
                  <p>Admin</p>
               </MemberBox>
            </MembersCont>
            <ButtonsCont>
               <ButtonDelete disabled={!email}>Delete</ButtonDelete>
               <ButtonCreate>Create</ButtonCreate>
            </ButtonsCont>
         </InviteParticipantModal>
      </div>
   )
}

const InviteParticipantModal = styled('div')({
   width: '26.5625rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   padding: '1rem',
   boxSizing: 'border-box',
   position: 'absolute',
   right: '0.010rem',
   bottom: '1rem',
   borderRadius: '0.5rem',
   background: 'white',
   zIndex: '999',
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
