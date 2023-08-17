import { useState } from 'react'
import { styled } from '@mui/material'
import { avatarsData } from '../../../utils/constants/avatars'

export const Avatars = () => {
   const [selectedUser, setSelectedUser] = useState(null)

   const visibleAvatars = avatarsData.slice(0, 9)

   const handleAvatarClick = (user) => {
      setSelectedUser(user)
   }
   const handleBackdropClick = () => {
      setSelectedUser(null)
   }

   return (
      <AvatarBox>
         {visibleAvatars.map((avatar) => (
            <AvatarImageBox
               key={avatar.id}
               onClick={() => handleAvatarClick(avatar)}
            >
               <AvatarImage src={avatar.image} alt="" />
            </AvatarImageBox>
         ))}
         {avatarsData.length > 9 && (
            <div>
               <AvatarImageMore>+{avatarsData.length - 9}</AvatarImageMore>
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
                        <p>{selectedUser.name}</p>
                        <StyledEmail>{selectedUser.email}</StyledEmail>
                     </EmailAndNameBox>
                  </UserInfoContainer>
                  <EditProfile>Edit your profile</EditProfile>
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
   border: '0.3125rem solid white',
   cursor: 'pointer',
})

const AvatarImageMore = styled('div')({
   width: '2.5rem',
   height: '2.5rem',
   borderRadius: '2.125rem',
   marginRight: '-1rem',
   border: '0.3125rem solid white',
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
const StyledEmail = styled('p')({
   color: '#919191',
})

const UserInfoBox = styled('div')({
   width: '18.0625rem',
   height: '8rem',
   position: 'absolute',
   top: '110%',
   left: '50%',
   transform: 'translateX(-50%)',
   backgroundColor: 'white',
   borderRadius: '0.25rem',
   gap: '1rem',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
   padding: '1rem',
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

const EditProfile = styled('p')({
   cursor: 'pointer',
   marginTop: '1rem',
})

const BackDrop = styled('div')({
   position: 'absolute',
   width: '100%',
   height: '100vh',
})
