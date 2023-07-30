import React, { useState } from 'react'
import { styled } from '@mui/material'
import { ModalUi } from '../UI/modal/Modal'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import { Xicon } from '../../assets/icons'

export const WorkspaceModal = ({ showModal, setShowModal }) => {
   const [workspaceName, setWorkspaceName] = useState('')
   const [inviteMember, setInviteMember] = useState('')
   const [todoEmails, setTodoEmails] = useState([])

   const addHandlerTodo = (data) => {
      setTodoEmails([...todoEmails, data])
   }
   const removeEmailHandler = (id) => {
      setTodoEmails(todoEmails.filter((item) => item.id !== id))
   }

   const addEmailHandler = () => {
      const data = {
         title: inviteMember,
         id: new Date(),
      }
      addHandlerTodo(data)
      setInviteMember('')
   }
   const handleCreateWorkspace = () => {
      console.log('Creating workspace...')
   }

   const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      return emailRegex.test(email)
   }

   const isCreateDisabled = () => {
      if (
         (!isValidEmail(inviteMember) && todoEmails.length === 0) ||
         !workspaceName
      ) {
         return true
      }
      return false
   }
   const submitHandler = (event) => {
      event.preventDefault()
      addEmailHandler()
   }

   return (
      <div>
         {showModal ? (
            <StyleModalUi open={showModal} onClose={() => setShowModal(false)}>
               <NewWorkspace>Create a new workspace</NewWorkspace>
               <LebelStyle sx={{ padding: '0 0 0.5rem 0' }} htmlFor="name">
                  Name of the workspace*
               </LebelStyle>
               <InputStyle
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  borderRadius=" 0.3rem"
               />
               <InputContainer onSubmit={submitHandler}>
                  <LebelStyle htmlFor="name">Invite a member</LebelStyle>
                  <EmailInputContainer>
                     <SecondInputStyle
                        type="email"
                        placeholder="exemple@gmail.com"
                        id="name"
                        value={inviteMember}
                        onChange={(e) => setInviteMember(e.target.value)}
                        border="none"
                        z
                     />
                     <MapContainer>
                        {todoEmails.map((item) => (
                           <div>
                              <p key={item.id}>{item.title}</p>
                              <Xicon
                                 onClick={() => removeEmailHandler(item.id)}
                                 style={{
                                    margin: '0.3rem 0.6rem 0.2rem 0 ',
                                    cursor: 'pointer',
                                 }}
                              />
                           </div>
                        ))}
                     </MapContainer>
                  </EmailInputContainer>
               </InputContainer>
               <ButtonContainer>
                  <CanselButton onClick={() => setShowModal(false)}>
                     Cancel
                  </CanselButton>
                  <SaveButton
                     onClick={handleCreateWorkspace}
                     disabled={isCreateDisabled()}
                  >
                     Create
                  </SaveButton>
               </ButtonContainer>
            </StyleModalUi>
         ) : null}
      </div>
   )
}

const StyleModalUi = styled(ModalUi)(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: 'auto',
   width: '24.9625rem',
   bordeRadius: '0.625rem',
   background: '#FFF',
}))
const LebelStyle = styled('label')(() => ({
   color: '#919191',
   fontSize: '0.875rem',
   marginTop: '1.25rem',
}))
const InputContainer = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   height: 'auto',
   gap: '1.5rem',
   justifyContent: 'end',
   marginTop: '1.5rem',
}))
const CanselButton = styled(Button)(() => ({
   height: '2.125',
   width: '5.125rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   backgroundColor: '#F0F0F0',
   textTransform: 'capitalize',
   color: '#919191',
   padding: '0.5rem 1rem',
}))
const SaveButton = styled(Button)(() => ({
   height: '2.125',
   width: '5.125rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   textTransform: 'capitalize',
   padding: '0.5rem 1rem',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
   },
}))

const NewWorkspace = styled('span')(() => ({
   fontSize: '1rem',
   color: '#000',
   display: 'flex',
   justifyContent: 'center',
   marginBottom: '1rem',
}))

const InputStyle = styled(Input)(() => ({
   input: {
      width: '20.5625rem',
      height: '1.8rem',
      padding: ' 0.375rem 1rem',
      alignItems: ' center',
      borderRadius: '0.5rem',
   },
}))
const EmailInputContainer = styled('div')(() => ({
   width: '100%',
   borderRadius: ' 0.3rem',
   border: ' 1px solid #D0D0D0',
}))
const SecondInputStyle = styled(Input)(() => ({
   input: {
      width: '20vw',
      height: '1.8rem',
      padding: ' 0 1rem',
      margin: ' 0.5rem',
      alignItems: ' center',
      border: 'none',
   },
}))
const MapContainer = styled('div')(() => ({
   div: {
      display: 'inline-flex',
      alignItems: ' start',
      backgroundColor: '#F0F0F0',
      margin: '0 0 0.5rem 1rem ',
      borderRadius: '0.8rem',
   },
   p: {
      display: 'inline-flex',
      padding: '0.28rem 1rem',
      color: '#919191',
   },
}))
