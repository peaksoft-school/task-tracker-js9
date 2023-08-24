import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
   MenuItem,
   styled,
   FormControl,
   Select,
   IconButton,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ExitIcon, PlusIcon, SearchIcon } from '../../../assets/icons'
import { InviteNewParticipant } from './InviteModal'
import { allinviteMember } from '../../../store/inviteMember/inviteThunk'

export const Participant = ({
   openNewInvite,
   openParticipantHandler,
   setOpenNewInvite,
}) => {
   // const kindaSelect = [
   //    { label: 'Admin', value: 'Admin' },
   //    { label: 'Member', value: 'Member' },
   // ]

   // const initialUsers = [
   //    { name: 'Aidana', role: 'Member' },
   //    { name: 'Nazira ', role: 'Member' },
   //    { name: 'Nazira ', role: 'Member' },
   // ]

   const { inviteMember } = useSelector((state) => state.inviteMember)
   const dispatch = useDispatch()
   const { boardId } = useParams()

   const [users, setUsers] = useState(inviteMember)

   const openInviteNewModal = () => {
      setOpenNewInvite((prev) => !prev)
   }
   useEffect(() => {
      dispatch(allinviteMember(boardId))
   }, [dispatch])

   const handleRolesChange = (event, index) => {
      const updatedUsers = [...inviteMember]
      updatedUsers[index].role = event.target.value
      setUsers(updatedUsers)
   }

   return openNewInvite ? (
      <InviteNewParticipant openInviteNewModal={openInviteNewModal} />
   ) : (
      <Container>
         <ParticipantContainer>
            <ParticipantHeader>
               <p>{}</p>
               <p>Participant</p>
               <IconButton>
                  <ExitIconStyled onClick={openParticipantHandler} />
               </IconButton>
            </ParticipantHeader>
            <InputBox>
               <SearchIconStyled />
               <InputEmail placeholder="example@gmail.com" type="email" />
            </InputBox>
            <UsersBox>
               <AdminBox>
                  <p>Ali (you)</p>
                  <AdminP>Admin</AdminP>
               </AdminBox>
               {users.map((user, index) => (
                  <UsersSelectBox key={user.id}>
                     <p>{user.firstName}</p>
                     <FormControlMui>
                        <SelectStyledMui
                           value={user.role}
                           onChange={(e) => handleRolesChange(e, index)}
                        >
                           {users.map((item) => (
                              <MenuItem key={item.role} value={item.role}>
                                 {item.role}
                              </MenuItem>
                           ))}
                        </SelectStyledMui>
                     </FormControlMui>
                  </UsersSelectBox>
               ))}
            </UsersBox>
            <InviteNewBox
               setOpenNewInvite={setOpenNewInvite}
               onClick={openInviteNewModal}
            >
               <PlusIcon fill="#727272" />
               <p>Invite a new participant</p>
            </InviteNewBox>
         </ParticipantContainer>
      </Container>
   )
}
const Container = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))
const ParticipantContainer = styled('div')({
   width: '26.5625rem',
   height: '18.3125rem',
   padding: '1rem',
   borderRadius: '0.5rem',
   backgroundColor: 'white',
   position: 'fixed',
   zIndex: '2',
})

const ParticipantHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
})

const InputBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
})

const InputEmail = styled('input')({
   width: '24.0625rem',
   height: '2rem',
   borderRadius: '0.5rem',
   border: '1px solid grey',
   padding: '0.375rem 1rem 0.375rem 2rem',
   boxSizing: 'border-box',
   margin: '0rem 1rem 1rem 0rem',
})

const UsersBox = styled('div')({
   maxHeight: '8rem',
   overflowY: 'auto',
})

const SearchIconStyled = styled(SearchIcon)({
   position: 'relative',
   top: '-0.5rem',
   left: '1.5rem',
})

const UsersSelectBox = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const InviteNewBox = styled('div')({
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   cursor: 'pointer',
   color: '#727272',
   fontWeight: 500,
})

const ExitIconStyled = styled(ExitIcon)({
   cursor: 'pointer',
})

const SelectStyledMui = styled(Select)({
   fontFamily: 'CarePro',
   fieldset: {
      border: 'none',
   },
})

const FormControlMui = styled(FormControl)({
   width: '7.5rem',
   height: '2.8rem',
})

const AdminBox = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '1rem',
   marginBottom: '0.5rem',
})

const AdminP = styled('p')({
   marginRight: '3.5rem',
})
