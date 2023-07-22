import { styled } from '@mui/system'
import React, { useState } from 'react'
import { ModalUi } from '../UI/modal/Modal'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'

export const ModalSideBar = ({
   showModal,
   setShowModal,
   editInput,
   etidChangeInput,
}) => {
   const [showSecondModal, setShowSecondModal] = useState(false)

   const openDeleteModal = () => {
      setShowSecondModal(!showSecondModal)
      setShowModal(false)
   }
   return (
      <div>
         {' '}
         {showModal ? (
            <StyleModalUi open={showModal} onClose={() => setShowModal(false)}>
               <SettingStyle>Setting</SettingStyle>
               <InputStyle
                  value={editInput}
                  onChange={etidChangeInput}
                  type="text"
               />
               <ClarifyStyle onClick={openDeleteModal}>
                  Delete this workspace?
               </ClarifyStyle>
               <ButtonContainer>
                  <CanselButton onClick={() => setShowModal(false)}>
                     Cancel
                  </CanselButton>
                  <SaveButton>Save</SaveButton>
               </ButtonContainer>
            </StyleModalUi>
         ) : null}
         {showSecondModal ? (
            <StyleModalUi open={showSecondModal} onClose={openDeleteModal}>
               <SettingStyle>Delete workspace</SettingStyle>
               <ClarifyStyled>
                  Are you sure to delete this workspace?
               </ClarifyStyled>
               <ButtonContainerSecond>
                  <CanselButton onClick={openDeleteModal}>Cancel</CanselButton>
                  <DeleteButton>Delete</DeleteButton>
               </ButtonContainerSecond>
            </StyleModalUi>
         ) : null}
      </div>
   )
}

const SettingStyle = styled('span')(() => ({
   fontSize: '1rem',
   color: '#000',
   display: 'flex',
   justifyContent: 'center',
   marginBottom: '1rem',
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   gap: '1rem',
}))
const ButtonContainerSecond = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   marginTop: '2.5rem',
   gap: '1rem',
}))
const ClarifyStyle = styled('span')(() => ({
   fontSize: '1rem',
   color: '#D91212',
   display: 'flex',
   justifyContent: 'start',
   marginTop: '1rem',
   cursor: 'pointer',
}))
const ClarifyStyled = styled('span')(() => ({
   fontSize: '1rem',
   color: '#919191',
   display: 'flex',
   justifyContent: 'center',
   marginTop: '1rem',
}))
const StyleModalUi = styled(ModalUi)(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: '11.625rem',
   bordeRadius: '0.625rem',
   background: '#FFF',
}))
const CanselButton = styled(Button)(() => ({
   height: '2.125',
   width: '4.885rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   backgroundColor: '#F0F0F0',
   textTransform: 'capitalize',
   color: '#919191',
}))
const SaveButton = styled(Button)(() => ({
   height: '2.125',
   width: '4rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
   },
}))
const DeleteButton = styled(Button)(() => ({
   height: '2.125',
   width: '4.75rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   textTransform: 'capitalize',
   backgroundColor: '#D91212',
   '&:hover': {
      backgroundColor: '#971414',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#db3333',
   },
}))
const InputStyle = styled(Input)(() => ({
   input: {
      width: '27.3125rem',
      height: '1.8rem',
      padding: ' 0.375rem 1rem',
      alignItems: ' center',
      bordeRadius: '0.5rem',
      border: '1px solid #D0D0D0',
   },
}))
