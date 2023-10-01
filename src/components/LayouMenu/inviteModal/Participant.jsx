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
import {
   allinviteMember,
   updateRoles,
} from '../../../store/inviteMember/inviteThunk'

const filterUsersByUserId = (users) => {
   const seenUserIds = new Set()
   return users?.filter((user) => {
      if (seenUserIds.has(user.userId)) {
         return false
      }
      seenUserIds.add(user.userId)
      return true
   })
}

export const Participant = ({
   openModalHandler,
   openNewInvite,
   setOpenNewInvite,
}) => {
   const kindaSelect = [
      { label: 'Admin', value: 'ADMIN' },
      { label: 'Member', value: 'MEMBER' },
   ]
   const [, setUserRoles] = useState({})
   const { inviteMember } = useSelector((state) => state.inviteMember)

   const dispatch = useDispatch()
   const { boardId } = useParams()

   const openInviteNewModal = () => {
      setOpenNewInvite((prev) => !prev)
   }
   const onRoleChange = (memberId, newRole) => {
      setUserRoles((prevRoles) => ({
         ...prevRoles,
         [memberId]: newRole,
      }))

      dispatch(
         updateRoles({
            memberId,
            role: newRole,
            boardId,
         })
      )
   }

   useEffect(() => {
      dispatch(allinviteMember(boardId))
   }, [dispatch])

   const filteredInviteMembers = filterUsersByUserId(inviteMember)

   return openNewInvite ? (
      <InviteNewParticipant
         openInviteNewModal={openInviteNewModal}
         openModalHandler={openModalHandler}
      />
   ) : (
      <Container>
         <ParticipantContainer>
            <ParticipantHeader>
               <p>{}</p>
               <p>Participant</p>
               <IconButton onClick={openModalHandler}>
                  <ExitIcon fill="gray" />
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

               {filteredInviteMembers.map((user) => (
                  <UsersSelectBox key={user.userId}>
                     <p>{user.firstName}</p>

                     <FormControlMui>
                        <SelectStyledMui
                           onChange={(event) =>
                              onRoleChange(user.userId, event.target.value)
                           }
                           label={user.role}
                           defaultValue={user.role}
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
   color: '#727272',
   padding: '0.2rem 0rem',
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
