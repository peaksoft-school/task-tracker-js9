import React, { useState } from 'react'
import { MenuItem, styled, FormControl, Select } from '@mui/material'
import { ExitIcon, PlusIcon, SearchIcon } from '../../../assets/icons'
import { InviteNewParticipant } from './InviteModal'

export const Participant = ({ openModalHandler }) => {
   const [openNewInvite, setOpenNewInvite] = useState(false)
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

   return (
      <ParticipantContainer>
         <ParticipantHeader>
            <p>{}</p>
            <p>Participant</p>
            <ExitIconStyled onClick={openModalHandler} />
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
         {openNewInvite && (
            <InviteNewParticipant openInviteNewModal={openInviteNewModal} />
         )}
      </ParticipantContainer>
   )
}

const ParticipantContainer = styled('div')({
   width: '26.5625rem',
   height: '17.3125rem',
   padding: '1rem',
   position: 'absolute',
   left: '28rem',
   top: '8rem',
   borderRadius: '0.5rem',
   backgroundColor: 'white',
   zIndex: '2',
})

const ParticipantHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
})

const InputBox = styled('div')({})

const InputEmail = styled('input')({
   width: '24.0625rem',
   height: '2rem',
   borderRadius: '0.5rem',
   border: '1px solid grey',
   padding: '0.375rem 1rem 0.375rem 2rem',
   boxSizing: 'border-box',
   marginBottom: '1rem',
})

const UsersBox = styled('div')({
   maxHeight: '8rem',
   overflowY: 'auto',
})

const SearchIconStyled = styled(SearchIcon)({
   position: 'absolute',
   top: '3.8rem',
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
