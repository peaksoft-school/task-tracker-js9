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
      { name: 'firstName' },
      { name: 'middleName' },
      { name: 'email' },
   ]

   const [photo] = useState(
      'data:image/jpeg;base64,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'
   )

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
            <div>
               <ProfileImageBox photo={photo} />
            </div>
            <div>
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
                           placeholder="password"
                           value={profile.password}
                           onChange={handleInputChange}
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
                           placeholder="confirmPassword"
                           value={profile.confirmPassword}
                           onChange={handleInputChange}
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
}))

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
   justifyContent: 'center',
   alignItems: 'center',
   width: '9.125rem',
   height: '4.125rem',
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
