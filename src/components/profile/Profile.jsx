import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Button, IconButton, TextField } from '@mui/material'
import { HideIcon, ShowIcon } from '../../assets/icons'
import ColorBackground from '../../assets/images/ColorsBakground.png'

export function ProfileForm() {
   const [profile, setProfile] = useState({
      firstName: '',
      middleName: '',
      email: '',
      password: '',
      confirmPassword: '',
   })

   const [involvedProjects] = useState([
      'Project 1',
      'Project 2',
      'Project 3',
      'ali',
   ])
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const inputFields = [
      { name: 'firstName', label: 'name' },
      { name: 'middleName', label: 'lastName' },
      { name: 'email', label: 'email' },
   ]

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setProfile((prevProfile) => ({ ...prevProfile, [name]: value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
   }

   const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }

   const handleToggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(
         (prevShowConfirmPassword) => !prevShowConfirmPassword
      )
   }

   return (
      <div>
         <StyledWorkspace>
            <WorkSpaceSpan>Workspaces</WorkSpaceSpan>
            <WorkSpaceSpanTwo>\ Profile</WorkSpaceSpanTwo>
         </StyledWorkspace>
         <ProfileContainer>
            <ProfileImage />
            <StyledFormContainer onSubmit={handleSubmit}>
               <div>
                  {inputFields.map((field) => (
                     <div key={field.name}>
                        <StyledTextField
                           type="text"
                           id={field.name}
                           name={field.name}
                           value={profile[field.name]}
                           onChange={handleInputChange}
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
                        label="Password"
                        value={profile.password}
                        onChange={handleInputChange}
                        InputProps={{
                           endAdornment: (
                              <PasswordVisibilityButton
                                 onClick={handleTogglePasswordVisibility}
                              >
                                 {showPassword ? <ShowIcon /> : <HideIcon />}
                              </PasswordVisibilityButton>
                           ),
                        }}
                     />
                  </div>
                  <div>
                     <StyledPasswordField
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={profile.confirmPassword}
                        onChange={handleInputChange}
                        InputProps={{
                           endAdornment: (
                              <PasswordVisibilityButton
                                 onClick={handleToggleConfirmPasswordVisibility}
                              >
                                 {showConfirmPassword ? (
                                    <ShowIcon />
                                 ) : (
                                    <HideIcon />
                                 )}
                              </PasswordVisibilityButton>
                           ),
                        }}
                     />
                     <SaveButton
                        type="submit"
                        variant="contained"
                        color="primary"
                     >
                        Save
                     </SaveButton>
                  </div>
               </PasswordFieldsContainer>
            </StyledFormContainer>
         </ProfileContainer>
         <ProjectsContainer>
            <ProjectsHeader>
               <p>Involved in projects</p>
               <ProjectCount>{involvedProjects.length}</ProjectCount>
            </ProjectsHeader>
            <ProjectsList>
               {involvedProjects.map((project) => (
                  <ProjectCard key={project}>{project}</ProjectCard>
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
   display: 'flex',
   alignItems: 'center',
   width: '46.625rem',
   height: '18.6875rem',
   marginLeft: '3.75rem',
})

const StyledFormContainer = styled('form')({
   display: 'flex',
   gap: '1.87rem',
})

const ProfileImage = styled('div')({
   width: '6.25rem',
   height: '6.25rem',
   borderRadius: '50%',
   backgroundSize: 'cover',
   marginRight: '1.25rem',
   backgroundColor: 'red',
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
   marginBottom: '1rem',
   width: '20.0625rem',
   height: '2rem',
   padding: '0.375rem 1rem 0.375rem 1rem',
   borderRadius: '2rem',
})

const PasswordFieldsContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: 'auto',
})

const PasswordVisibilityButton = styled(IconButton)({
   padding: '8px',
   background: 'none',
   border: 'none',
   cursor: 'pointer',
})

const SaveButton = styled(Button)({
   display: 'inline-flex',
   padding: '0.5rem 1rem',
   alignItems: 'flex-start',
   gap: '0.5rem',
   borderRadius: '1.5rem',
   background: '#0079BF',
})

const ProjectsContainer = styled('div')({
   marginTop: '2rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const ProjectsHeader = styled('div')({
   display: 'flex',
   alignItems: 'center',
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
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '3rem',
   backgroundColor: '#ECECEC',
   borderRadius: '0.5rem',
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
