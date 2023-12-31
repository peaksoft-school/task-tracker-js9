import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, styled } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useParams } from 'react-router-dom'
import { ExitIcon, SearchIcon } from '../../../assets/icons'
import {
   createMembersInCard,
   getMembersInCard,
} from '../../../store/inviteMember/inviteThunk'
import { showSnackbar } from '../../UI/snackbar/Snackbar'

export const Members = ({ closeMembersHandler }) => {
   const { inviteMember } = useSelector((state) => state.inviteMember)
   const { carId } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getMembersInCard({ cardId: +carId }))
   }, [])

   const filterUsersByUserId = (users) => {
      const seenUserIds = new Set()
      return users?.filter((user) => {
         if (seenUserIds?.has(user.userId)) {
            return false
         }
         seenUserIds.add(user.userId)
         return true
      })
   }

   const filteredInviteMembers = filterUsersByUserId(inviteMember)
   console.log('filteredInviteMembers: ', filteredInviteMembers)

   const postMemberHandler = (member) => {
      const data = {
         memberId: member.userId,
         cardId: +carId,
      }
      dispatch(createMembersInCard(data))
         .unwrap()
         .then(() => {
            showSnackbar({
               message: 'Successfully added members',
               severity: 'success',
            })
            dispatch(getMembersInCard({ cardId: carId }))
         })
         .catch((error) => {
            showSnackbar({
               message: 'Failed to add members',
               severity: 'error',
            })
            return error
         })
   }

   return (
      <Container>
         <HeaderMember>
            <p>{}</p>
            <p>Members</p>
            <IconButton onClick={closeMembersHandler}>
               <ExitIcon />
            </IconButton>
         </HeaderMember>
         <InputStyledCont>
            <InputStyled placeholder="Search" type="text" />
            <IconButtonStyled>
               <SearchIcon />
            </IconButtonStyled>
         </InputStyledCont>
         <MembersCont>
            {filteredInviteMembers?.map((member) => (
               <ContInMember
                  onClick={() => postMemberHandler(member)}
                  key={member.id}
               >
                  {member.image === 'Default image' || member.image === null ? (
                     <AccountCircleIconStyled />
                  ) : (
                     <StyledImage src={member.image} alt="" />
                  )}
                  <div>
                     <p>{member.firstName}</p>
                     <EmailStyled>{member.email}</EmailStyled>
                  </div>
               </ContInMember>
            ))}
         </MembersCont>
      </Container>
   )
}

const Container = styled('div')({
   position: 'absolute',
   width: '19.375rem',
   height: 'fit-content',
   maxHeight: '60vh',
   overflowY: 'scroll',
   backgroundColor: '#fff',
   top: '3rem',
   borderRadius: '10px',

   padding: '1rem',
   zIndex: 1000,
   scrollbarWidth: 'thin',
   scrollbarColor: ' #D9D9D9 transparent',
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
   boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.2)',
})

const HeaderMember = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingBottom: '1rem',
})

const InputStyledCont = styled('div')({
   position: 'relative',
   width: '16.875rem',
   height: '2rem',
   borderRadius: '0.5rem',
   paddingLeft: '0.7rem',
   border: '1px solid grey',
})

const IconButtonStyled = styled(IconButton)({
   position: 'absolute',
   top: '50%',
   right: '0.5rem',
   transform: 'translateY(-50%)',
})
const InputStyled = styled('input')({
   border: 'none',
   outline: 'none',
   marginTop: '9px',
   width: '13rem',
})

const MembersCont = styled('div')({})

const ContInMember = styled('div')({
   display: 'flex',
   gap: '1rem',
   paddingTop: '1rem',
   cursor: 'pointer',
})

const StyledImage = styled('img')({
   width: '2.5rem',
   height: '2.5rem',
   borderRadius: '50%',
})

const EmailStyled = styled('p')({
   color: '#3C3C3C',
   maxWidth: '12rem',
   overflowX: 'hidden',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis',
})

const AccountCircleIconStyled = styled(AccountCircleIcon)({
   width: '2.5rem',
   height: '2.5rem',
})
