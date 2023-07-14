import React from 'react'
import { styled } from '@mui/system'
import { Button, IconButton, TextField } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditIcon, HideIcon, ShowIcon } from '../../assets/icons'
import ColorBackground from '../../assets/images/ColorsBakground.png'
import { Header } from '../header/Header'
import { involvedProjects, testFields } from '../../utils/constants/general'
import { validatePassword } from '../../utils/helpers/Helpers'

const schema = yup.object().shape({
   firstName: yup.string().required('First name is required'),
   middleName: yup.string().required('Middle name is required'),
   email: yup.string().email('Invalid email').required('Email is required'),
})

export function ProfileForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

   const [showPassword, setShowPassword] = React.useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
   const [passwordDirty, setPasswordDirty] = React.useState(false)
   const [confirmPasswordDirty, setConfirmPasswordDirty] = React.useState(false)
   const [profile, setProfile] = React.useState({
      firstName: 'Ali',
      lastName: 'Samatov',
      email: 'alisamatov@gmail',
      password: '',
      confirmPassword: '',
      avatarUrl:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFTPsr3IXU1GSbXyXhd1nOZSkTYRriwNtYg&usqp=CAU',
   })
   const projectCount = involvedProjects.length

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setProfile((prevProfile) => ({ ...prevProfile, [name]: value }))
   }

   const handleFormSubmit = () => {}

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
         setProfile((prevProfile) => ({
            ...prevProfile,
            avatarUrl: uploadedImageUrl,
         }))
      }

      reader.readAsDataURL(file)
   }

   const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop })

   return (
      <div>
         <Header />
         <StyledWorkspace>
            <WorkSpaceSpan>Workspaces</WorkSpaceSpan>
            <WorkSpaceSpanTwo>\ Profile</WorkSpaceSpanTwo>
         </StyledWorkspace>
         <ProfileContainer>
            <div>
               <ProfileImageBox {...getRootProps()} photo={profile.avatarUrl}>
                  <input {...getInputProps()} />
                  <ProfileImageEdit type="file" placeholder="ali" />
                  <EditProfileIcon />
               </ProfileImageBox>
               <ProfileNames>
                  <ProfileNamesSpan>{profile.firstName}</ProfileNamesSpan>
                  <ProfileNamesSpan>{profile.lastName}</ProfileNamesSpan>
               </ProfileNames>
            </div>
            <div>
               <StyledFormContainer onSubmit={handleSubmit(handleFormSubmit)}>
                  <div>
                     {testFields.map((field) => (
                        <div key={field.name}>
                           <StyledTextField
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              value={profile[field.name]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              {...register(field.name)}
                              error={!!errors[field.name]}
                              helperText={errors[field.name]?.message}
                           />
                        </div>
                     ))}
                  </div>
                  <PasswordFieldsContainer>
                     <div>
                        <StyledPasswordField
                           type={showPassword ? 'text' : 'password'}
                           id="password"
                           name="password"
                           placeholder="Password"
                           value={profile.password}
                           onChange={handleInputChange}
                           error={
                              passwordDirty &&
                              !validatePassword(profile.password)
                           }
                           helperText={
                              passwordDirty &&
                              !validatePassword(profile.password)
                                 ? 'Password must be at least 6 characters long'
                                 : ''
                           }
                           onBlur={() => setPasswordDirty(true)}
                           InputProps={{
                              endAdornment: (
                                 <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                 >
                                    {showPassword ? <ShowIcon /> : <HideIcon />}
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
                           placeholder="Confirm Password"
                           value={profile.confirmPassword}
                           onChange={handleInputChange}
                           error={
                              confirmPasswordDirty &&
                              profile.password !== profile.confirmPassword
                           }
                           helperText={
                              confirmPasswordDirty &&
                              profile.password !== profile.confirmPassword
                                 ? 'Passwords do not match'
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
                              Save
                           </SaveButton>
                        </ButtonDiv>
                     </div>
                  </PasswordFieldsContainer>
               </StyledFormContainer>
            </div>
         </ProfileContainer>
         <ProjectsContainer>
            <ProjectsHeader>
               <p>Involved in projects</p>
               <ProjectCount>{projectCount}</ProjectCount>
            </ProjectsHeader>
            <ProjectsList>
               {involvedProjects.map((project) => (
                  <ProjectCard key={project.title}>
                     <div>
                        <ProjectCardFirstLetter>
                           {project.title && project.title.charAt(0)}
                        </ProjectCardFirstLetter>
                     </div>
                     <div>
                        <ProjectCardTitle>{project.title}</ProjectCardTitle>
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
   backgroundColor: 'grey',
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
   padding: '0.375rem 1rem',
   justifyContent: 'space-between',
   alignItems: 'center',
   borderRadius: '0.5rem',
   border: '1px solid #D0D0D0',
   marginBottom: '1rem',
})

const StyledPasswordField = styled(TextField)({
   width: '20.0625rem',
   marginBottom: '1rem',
   '& .MuiInputBase-root': {
      height: '1.8rem',
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
})

const ProjectsHeader = styled('div')({
   display: 'flex',
   marginBottom: '1rem',
})

const ProjectCount = styled('span')({
   marginLeft: '0.5rem',
   fontWeight: 'bold',
})

const ProjectsList = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
})

const ProjectCard = styled('div')({
   display: 'flex',
   alignItems: 'center',
   width: '9.125rem',
   height: '4.125rem',
   borderRadius: '0.5rem',
   gap: '0.7rem',
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
