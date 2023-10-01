import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, keyframes } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useParams } from 'react-router-dom'
import { allinviteMember } from '../../../store/inviteMember/inviteThunk'

const filterUsersByUserId = (users) => {
   const seenUserIds = new Set()
   return users.filter((user) => {
      if (seenUserIds.has(user.userId)) {
         return false
      }
      seenUserIds.add(user.userId)
      return true
   })
}

export const Avatars = () => {
   const [selectedUser, setSelectedUser] = useState(null)
   const { inviteMember } = useSelector((state) => state.inviteMember)
   const { boardId } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(allinviteMember(boardId))
   }, [])

   const filteredInviteMembers = filterUsersByUserId(inviteMember)

   const visibleAvatars = filteredInviteMembers.slice(0, 9)

   const handleAvatarClick = (user) => {
      setSelectedUser(user)
   }

   const handleBackdropClick = () => {
      setSelectedUser(null)
   }

   return (
      <AvatarBox>
         {visibleAvatars?.map((avatar) => (
            <AvatarImageBox
               key={avatar.userId}
               onClick={() => handleAvatarClick(avatar)}
            >
               {avatar.image === 'Default image' ? (
                  <CircleIconCont>
                     <AccountCircleIconStyled />
                  </CircleIconCont>
               ) : (
                  <AvatarImage src={avatar.image} alt="" />
               )}
            </AvatarImageBox>
         ))}
         {inviteMember?.length > 9 && (
            <div>
               <AvatarImageMore>+{inviteMember.length - 9}</AvatarImageMore>
            </div>
         )}

         {selectedUser && (
            <>
               <BackDrop onClick={handleBackdropClick} />
               <UserInfoBox>
                  <UserInfoContainer>
                     <div>
                        <SelectedImage src={selectedUser.image} alt="" />
                     </div>
                     <EmailAndNameBox>
                        <p style={{ fontWeight: '600' }}>
                           {selectedUser.firstName}
                        </p>
                        <EmailCont>
                           <StyledEmail>{selectedUser.email}</StyledEmail>
                        </EmailCont>
                     </EmailAndNameBox>
                  </UserInfoContainer>
                  {/* <EditProfile>Edit your profile</EditProfile> */}
               </UserInfoBox>
            </>
         )}
      </AvatarBox>
   )
}

const AvatarImage = styled('img')({
   width: '2.5rem',
   height: '2.5rem',
   borderRadius: '2.125rem',
   marginRight: '-1rem',
   border: '0.15rem solid white',
   cursor: 'pointer',
})

const AvatarImageMore = styled('div')({
   width: '2.5rem',
   height: '2.5rem',
   borderRadius: '2.125rem',
   marginRight: '-1rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#86A1B1',
   color: '#FFF',
   cursor: 'pointer',
})

const AvatarBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   position: 'relative',
})
const move = keyframes`
   0% {
      transform: translate(100%, 0);
   }
   100% {
      transform: translate(-100%, 0);
   }
`

const StyledEmail = styled('p')({
   display: 'inlineBlock',
   color: '#b0b0b0',
   animation: `${move} 5s linear infinite`,
})

const UserInfoBox = styled('div')({
   width: '18.0625rem',
   height: '6rem',
   position: 'absolute',
   top: '110%',
   left: '50%',
   transform: 'translateX(-50%)',
   backgroundColor: 'white',
   borderRadius: '0.5rem',
   gap: '1rem',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   padding: '1rem',
   zIndex: 2,
})

const AvatarImageBox = styled('div')({})

const UserInfoContainer = styled('div')({
   display: 'flex',
   alignItems: 'center',
   gap: '1rem',
})

const SelectedImage = styled('img')({
   width: '3.5rem',
   height: '3.5rem',
   borderRadius: '3.5rem',
})

const EmailAndNameBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.3rem',
})

const BackDrop = styled('div')({
   position: 'fixed',
   width: '100%',
   height: '100vh',
   zIndex: '2',
   top: '0',
   left: '0',
})

const CircleIconCont = styled('div')({
   width: '2.55rem',
   height: '2.55rem',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white',
   marginBottom: '3px',
})

const AccountCircleIconStyled = styled(AccountCircleIcon)({
   width: '2.55rem',
   height: '2.55rem',
})

const EmailCont = styled('div')({
   width: '70%',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   boxSizing: 'borderBox',
   position: 'relative',
})
