import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, IconButton, TextField } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditIcon, HideIcon, ShowIcon } from '../../assets/icons'
import ColorBackground from '../../assets/images/ColorsBakground.png'
import { schema } from '../../utils/helpers/Helpers'

import {
   profileGetRequest,
   profileProjectsRequest,
} from '../../store/profile/ProfileThunk'
import { ProfileActions } from '../../store/profile/ProfileSlice'

export const ProfileForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         firstName: 'Ваше имя',
         lastName: 'Ваша фамилия',
         email: 'example@example.com',
         confirmPassword: '',
      },
      resolver: yupResolver(schema),
   })

   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)

   const handleFormSubmit = (data) => {
      console.log(data)
   }

   const { item } = useSelector((state) => state.profile)

   const dispatch = useDispatch()

   const userRole = 'ADMIN'

   useEffect(() => {
      dispatch(profileGetRequest())
   }, [])
   useEffect(() => {
      if (item?.userId) {
         dispatch(profileProjectsRequest(item?.userId))
         console.log('bahaaaaaa')
      }
   }, [item?.userId])

   console.log(item)

   const [avatarUrl, setAvatarUrl] = useState('')

   const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }

   const handleToggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(
         (prevShowConfirmPassword) => !prevShowConfirmPassword
      )
   }

   const handleDrop = (acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = (event) => {
         const uploadedImageUrl = event.target.result
         setAvatarUrl(uploadedImageUrl)
      }

      reader.readAsDataURL(file)
   }

   useEffect(() => {
      console.log('Avatar URL changed:', avatarUrl)
   }, [avatarUrl])

   const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop })

   return (
      <div>
         <StyledWorkspace>
            <WorkSpaceSpan>Workspace</WorkSpaceSpan>
            <WorkSpaceSpanTwo> \ Profile</WorkSpaceSpanTwo>
         </StyledWorkspace>
         <ProfileContainer>
            <div>
               <ProfileImageBox {...getRootProps()} photo={avatarUrl}>
                  <input
                     {...getInputProps()}
                     type="file"
                     onChange={(event) => handleDrop(event.target.files)}
                  />
                  <ProfileImageEdit type="file" placeholder="ali" />
                  <EditProfileIcon />
               </ProfileImageBox>
               <ProfileNames>
                  <ProfileNamesSpan>{item?.firstName}</ProfileNamesSpan>
                  <ProfileNamesSpan>{item?.lastName}</ProfileNamesSpan>
               </ProfileNames>
            </div>
            <div>
               <StyledFormContainer onSubmit={handleSubmit(handleFormSubmit)}>
                  <div>
                     <StyledTextField
                        id={item?.userId}
                        value={item?.firstName}
                        onChange={(e) =>
                           dispatch(
                              ProfileActions.getFirstNameValue(e.target.value)
                           )
                        }
                     />
                     <StyledTextField
                        id={item?.userId}
                        value={item?.lastName}
                        onChange={(e) =>
                           dispatch(
                              ProfileActions.getLastNameValue(e.target.value)
                           )
                        }
                     />
                     <StyledTextField
                        id={item?.userId}
                        value={item?.email}
                        onChange={(e) =>
                           dispatch(
                              ProfileActions.getEmailValue(e.target.value)
                           )
                        }
                     />
                  </div>
                  {userRole === 'ADMIN' && (
                     <PasswordFieldsContainer>
                        <div>
                           <StyledPasswordField
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              {...register('password')}
                              error={passwordDirty && !!errors.password}
                              helperText={
                                 passwordDirty && errors.password?.message
                                    ? errors.password.message
                                    : ''
                              }
                              onBlur={() => setPasswordDirty(true)}
                              placeholder="Пароль"
                              InputProps={{
                                 endAdornment: (
                                    <IconButton
                                       onClick={handleTogglePasswordVisibility}
                                    >
                                       {showPassword ? (
                                          <ShowIcon />
                                       ) : (
                                          <HideIcon />
                                       )}
                                    </IconButton>
                                 ),
                              }}
                           />
                        </div>
                        <div>
                           <StyledPasswordField
                              type={showConfirmPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Подтвердите пароль"
                              {...register('confirmPassword')}
                              error={
                                 confirmPasswordDirty &&
                                 !!errors.confirmPassword
                              }
                              helperText={
                                 confirmPasswordDirty &&
                                 errors.confirmPassword?.message
                                    ? errors.confirmPassword.message
                                    : ''
                              }
                              onBlur={() => setConfirmPasswordDirty(true)}
                              InputProps={{
                                 endAdornment: (
                                    <IconButton
                                       onClick={
                                          handleToggleConfirmPasswordVisibility
                                       }
                                    >
                                       {showConfirmPassword ? (
                                          <ShowIcon />
                                       ) : (
                                          <HideIcon />
                                       )}
                                    </IconButton>
                                 ),
                              }}
                           />
                           <ButtonDiv>
                              <SaveButton
                                 type="submit"
                                 variant="contained"
                                 color="primary"
                              >
                                 add
                              </SaveButton>
                           </ButtonDiv>
                        </div>
                     </PasswordFieldsContainer>
                  )}
               </StyledFormContainer>
            </div>
         </ProfileContainer>
         <ProjectsContainer>
            <ProjectsHeader>
               <p>involved in projects</p>
               <ProjectCount>{item?.countWorkSpaces}</ProjectCount>
            </ProjectsHeader>
            <ProjectsList>
               {item?.workSpaceResponse?.map((project) => (
                  <ProjectCard key={Math.random().toString()}>
                     <div>
                        <ProjectCardFirstLetter>
                           {project.workSpaceName &&
                              project.workSpaceName.charAt(0)}
                        </ProjectCardFirstLetter>
                     </div>
                     <div>
                        <ProjectCardTitle>
                           {project.workSpaceName}
                        </ProjectCardTitle>
                        <ProjectCartText>{project.text}</ProjectCartText>
                     </div>
                  </ProjectCard>
               ))}
            </ProjectsList>
         </ProjectsContainer>
      </div>
   )
}

const WorkSpaceSpan = styled('span')({
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
   height: '18.6875rem',
   marginLeft: '3.75rem',
   position: 'relative',
   bottom: '3.8rem',
})

const StyledFormContainer = styled('form')({
   gap: '1.87rem',
   display: 'flex',
})

const ProfileImageEdit = styled('input')({
   width: '2.25rem',
   height: '2.25rem',
   padding: '0.375rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
   position: 'relative',
   top: '3rem',
   left: '4rem',
})

const ProfileImageBox = styled('div')(({ photo }) => ({
   width: '8.8125rem',
   height: '8.8125rem',
   borderRadius: '50%',
   backgroundSize: 'cover',
   marginRight: '1.25rem',
   marginBottom: '2rem',
   border: '0.3rem solid white',
   boxSizing: 'border-box',
   backgroundImage: `url(${photo})`,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   cursor: 'pointer',
}))

const EditProfileIcon = styled(EditIcon)({
   width: '2.25rem',
   height: '2.25rem',
   padding: '0.375rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
   position: 'relative',
   top: '3rem',
   left: '2rem',
   backgroundColor: '#d1c9c9',
})

const ProfileNames = styled('div')({
   position: 'relative',
   left: '10rem',
   bottom: '5rem',
   display: 'flex',
   gap: '0.5rem',
})
const ProfileNamesSpan = styled('span')({
   fontFamily: 'Cera Pro',
   fontSize: '1.25rem',
   fontWeight: '500',
})

const StyledTextField = styled('input')({
   display: 'flex',
   width: '20.0625rem',
   height: '2.125rem',
   padding: '0.375rem 1rem',
   justifyContent: 'space-between',
   alignItems: 'center',
   borderRadius: '0.5rem',
   border: '1px solid #D0D0D0',
   marginBottom: '1rem',
   fontWeight: '500',
   fontFamily: 'CarePro',
})

const StyledPasswordField = styled(TextField)({
   width: '20.0625rem',
   marginBottom: '1rem',
   '& .MuiInputBase-root': {
      height: '2.125rem',
      borderRadius: '0.5rem',
   },
})

const PasswordFieldsContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})

const ButtonDiv = styled('div')({
   display: 'flex',
   justifyContent: 'end',
})

const SaveButton = styled(Button)({
   background: '#0079BF',
   display: 'flex',
   width: '4rem',
   height: '2.125rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
   fontFamily: 'CarePro',
   fontWeight: '400',
})

const ProjectsContainer = styled('div')({
   marginTop: '2rem',
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '3.75rem',
   flexWrap: 'wrap',
})

const ProjectsHeader = styled('div')({
   display: 'flex',
   marginBottom: '1rem',
})

const ProjectCount = styled('span')({
   marginLeft: '0.5rem',
   fontWeight: 'bold',
   fontSize: '0.8rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'grey',
   borderRadius: '50%',
   width: '1.3rem',
   height: '1.3rem',
   color: 'white',
})

const ProjectsList = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   flexWrap: 'wrap',
   height: '20rem',
})

const ProjectCard = styled('div')({
   display: 'flex',
   alignItems: 'center',
   width: '9.125rem',
   height: '4.125rem',
   borderRadius: '0.5rem',
   gap: '0.7rem',
   cursor: 'pointer',
})

const ProjectCardFirstLetter = styled('div')({
   width: '4.25rem',
   height: '4.125rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: ' #0079BF',
   padding: '0.3125rem 0.8125rem 0.3125rem 0.8125rem',
   borderRadius: '0.625rem',
   gap: '0.5rem',
   color: 'white',
   fontFamily: 'Gilroy',
   fontWeight: '600',
   fontSize: '2rem',
})

const ProjectCardTitle = styled('h2')({
   fontFamily: 'CarePro',
   fontWeight: '500',
   color: '#000000',
})

const ProjectCartText = styled('p')({
   fontFamily: 'CarePro',
   fontWeight: '400',
   color: '#919191',
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
