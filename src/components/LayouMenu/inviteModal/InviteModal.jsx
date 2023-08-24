import { styled, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {
   ExitIcon,
   RadioEmptyIcon,
   RadioFilledIcon,
} from '../../../assets/icons'
import { Button } from '../../UI/button/Button'
import { createInviteMember } from '../../../store/inviteMember/inviteThunk'

export const InviteNewParticipant = ({
   openInviteNewModal,
   setOpenNewInvite,
}) => {
   const [isMemberSelected, setIsMemberSelected] = useState(false)
   const [isAdminSelected, setIsAdminSelected] = useState(false)
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()

   const toggleMemberSelection = () => {
      setIsMemberSelected((prev) => !prev)
   }

   const toggleAdminSelection = () => {
      setIsAdminSelected((prev) => !prev)
   }
   const createNewInviteMember = () => {
      const newdata = {
         emails: '',
         role: '',
      }
      dispatch(createInviteMember(newdata))
      setOpenNewInvite(false)
   }
   return (
      <Container>
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
               <ButtonCreate onClick={createNewInviteMember}>
                  Create
               </ButtonCreate>
            </ButtonsCont>
         </InviteParticipantModal>
      </Container>
   )
}
const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const InviteParticipantModal = styled('div')({
   width: '26.5625rem',
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
