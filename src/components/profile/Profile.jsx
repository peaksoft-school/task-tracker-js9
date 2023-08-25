import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { EditIcon } from '../../assets/icons'
import ColorBackground from '../../assets/images/ColorsBakground.png'
import { ProfileProjects } from './ProfileProjects'
import {
   profileAvatarRemoveRequest,
   profileAvatarSThreePost,
   profileGetByIdRequest,
   profileGetRequest,
} from '../../store/profile/ProfileThunk'
import { ProfileForm } from './ProfileForm'

export const Profile = () => {
   const [avatarUrl, setAvatarUrl] = useState('')
   const [openProfile, setOpenProfile] = useState(false)
   const { item, avatarLink, getItemById } = useSelector(
      (state) => state.profile
   )
   const { state } = useLocation()
   const { id } = useParams()

   console.log(state)

   const dispatch = useDispatch()

   useEffect(() => {
      if (avatarUrl) {
         setAvatarUrl(avatarUrl)
      }
   }, [avatarUrl])

   useEffect(() => {
      if (state.edit !== null) {
         dispatch(profileGetByIdRequest(id))
      } else {
         dispatch(profileGetRequest())
      }
   }, [dispatch])

   const handleDrop = async (acceptedFiles) => {
      const file = acceptedFiles[0]
      const newAvatarUrl = URL.createObjectURL(file)

      setAvatarUrl(newAvatarUrl)
      setOpenProfile(false)

      try {
         const formData = new FormData()
         formData.append('file', file)

         dispatch(profileAvatarSThreePost(formData))
      } catch (error) {
         console.error('Error uploading avatar:', error)
      }
   }

   const { getRootProps } = useDropzone({ onDrop: handleDrop })

   const openEditProfile = () => {
      setOpenProfile((prev) => !prev)
   }

   const removeAvatarHandler = () => {
      dispatch(profileAvatarRemoveRequest(avatarLink))
   }

   return (
      <div>
         <StyledWorkspace>
            <WorkSpaceSpan to="/mainPage">Workspace</WorkSpaceSpan>
            <WorkSpaceSpanTwo> \ Profile</WorkSpaceSpanTwo>
         </StyledWorkspace>
         <ProfileContainer>
            <div>
               {item.avatar === 'Default image' || item.avatar === null ? (
                  <EmptyAvatarLink>
                     <StyledAccountCircleIcon />
                  </EmptyAvatarLink>
               ) : (
                  <ProfileImageBox src={avatarLink} alt="avatar" />
               )}

               <EditProfileIcon onClick={openEditProfile} />
               {openProfile ? (
                  <EditProfileBox>
                     <EditProfileBoxP {...getRootProps()}>
                        Change profile photo
                     </EditProfileBoxP>
                     <EditProfileBoxP onClick={removeAvatarHandler}>
                        Remove
                     </EditProfileBoxP>
                  </EditProfileBox>
               ) : null}

               <ProfileNames>
                  <ProfileNamesSpan>
                     {state.edit === null
                        ? item?.firstName
                        : getItemById?.firstName}
                  </ProfileNamesSpan>
                  <ProfileNamesSpan>
                     {state.edit === null
                        ? item?.lastName
                        : getItemById?.lastName}
                  </ProfileNamesSpan>
               </ProfileNames>
            </div>
         </ProfileContainer>
         <ProfileForm />
         <ProfileProjects />
      </div>
   )
}
const WorkSpaceSpan = styled(NavLink)({
   color: 'white',
   cursor: 'pointer',
})
const WorkSpaceSpanTwo = styled('span')({
   color: 'white',
   fontSize: '16px',
   fontWeight: '500',
   lineHeight: '20px',
})

const ProfileContainer = styled('div')({
   alignItems: 'center',
   width: '46.625rem',
   marginLeft: '3.75rem',
   position: 'relative',
   bottom: '3.8rem',
})

const ProfileImageBox = styled('img')(() => ({
   width: '7.8125rem',
   height: '7.8125rem',
   borderRadius: '50%',
   boxSizing: 'border-box',
}))

const EditProfileIcon = styled(EditIcon)({
   width: '2.25rem',
   height: '2.25rem',
   padding: '0.375rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
   position: 'absolute',
   top: '5.5rem',
   left: '6.5rem',
   backgroundColor: '#d1c9c9',
   zIndex: 1000,
   cursor: 'pointer',
})

const ProfileNames = styled('div')({
   position: 'absolute',
   left: '10rem',
   top: '5rem',
   bottom: '5rem',
   display: 'flex',
   gap: '0.5rem',
})
const ProfileNamesSpan = styled('span')({
   fontFamily: 'CarePro',
   fontSize: '1.25rem',
   fontWeight: '500',
})

const StyledWorkspace = styled('div')({
   backgroundImage: `url(${ColorBackground})`,
   width: '100%',
   height: '11.5625rem',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   paddingTop: '0.625rem',
   paddingLeft: '0.625rem',
})

const EditProfileBox = styled('div')({
   width: '12.9375rem',
   backgroundColor: '#ebe7e7',
   borderRadius: '10px',
   zIndex: 100,
   position: 'absolute',
   top: '7rem',
   left: '8rem',
   height: '5.25rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'start',
   paddingLeft: '1rem',
   gap: '1rem',
})

const EditProfileBoxP = styled('p')({
   '&:hover': {
      cursor: 'pointer',
      borderBottom: '1px solid black',
   },
})

const EmptyAvatarLink = styled('div')({
   width: '7.8125rem',
   height: '7.8125rem',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white',
})

const StyledAccountCircleIcon = styled(AccountCircleIcon)({
   width: '7.8125rem',
   height: '7.8125rem',
})
