import React, { useState } from 'react'
import {
   MenuItem,
   styled,
   FormControl,
   Select,
   IconButton,
} from '@mui/material'
import { ExitIcon, PlusIcon, SearchIcon } from '../../../assets/icons'
import { InviteNewParticipant } from './InviteModal'

export const Participant = ({
   openModalHandler,
   openNewInvite,
   setOpenNewInvite,
}) => {
   const kindaSelect = [
      { label: 'Admin', value: 'Admin' },
      { label: 'Member', value: 'Member' },
   ]

   const initialUsers = [
      { name: 'Aidana', role: 'Member' },
      { name: 'Nazira ', role: 'Member' },
      { name: 'Nazira ', role: 'Member' },
   ]

   const [users, setUsers] = useState(initialUsers)

   const openInviteNewModal = () => {
      setOpenNewInvite((prev) => !prev)
   }
   const handleRolesChange = (event, index) => {
      const updatedUsers = [...users]
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
                  <ExitIcon fill="gray" onClick={openModalHandler} />
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
                     <p>{user.name}</p>
                     <FormControlMui>
                        <SelectStyledMui
                           value={user.role}
                           onChange={(e) => handleRolesChange(e, index)}
                        >
                           {kindaSelect.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                 {item.label}
                              </MenuItem>
                           ))}
                        </SelectStyledMui>
                     </FormControlMui>
                  </UsersSelectBox>
               ))}
            </UsersBox>
            <InviteNewBox onClick={openInviteNewModal}>
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
   height: '17.3125rem',
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

const UsersBox = styled('div')(() => ({
   width: '100%',
   maxHeight: '7.8rem',
   padding: '0.7rem ',
   overflowY: 'auto ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #D9D9D9 transparent',
   cursor: 'pointer',

   ' &::-webkit-scrollbar ': {
      width: '0.5rem',
   },
   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   ' &::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #D9D9D9',
      borderRadius: '0.25rem',
   },
}))

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
   color: '#525050',
   padding: '0.2rem 0rem  ',
   fontWeight: 500,
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
