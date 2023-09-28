import { styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalUi } from '../UI/modal/Modal'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import { deleteWorkspaceById } from '../../store/workspace/workspaceThunk'

export const ModalSideBar = ({
   showModal,
   setShowModal,
   editInput,
   etidChangeInput,
   changeTitleHandler,
}) => {
   const [showSecondModal, setShowSecondModal] = useState(false)

   const openDeleteModal = () => {
      setShowSecondModal(!showSecondModal)
      setShowModal(false)
   }
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const deleteWorkspacesHandler = () => {
      const data = {
         id,
         navigate,
      }
      dispatch(deleteWorkspaceById(data))
      openDeleteModal()
   }
   return (
      <div>
         {showModal ? (
            <StyleModalUi open={showModal} onClose={() => setShowModal(false)}>
               <SettingStyle>Setting</SettingStyle>
               <InputStyle
                  value={editInput}
                  onChange={(e) => etidChangeInput(e)}
                  type="text"
               />
               <ClarifyStyle onClick={openDeleteModal}>
                  Delete this workspace?
               </ClarifyStyle>
               <ButtonContainer>
                  <CanselButton onClick={() => setShowModal(false)}>
                     Cancel
                  </CanselButton>
                  <SaveButton onClick={changeTitleHandler}>Save</SaveButton>
               </ButtonContainer>
            </StyleModalUi>
         ) : null}
         {showSecondModal ? (
            <ModalUi open={showSecondModal} onClose={openDeleteModal}>
               <Container>
                  <div>
                     <h3 style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                        Delete workspace:
                     </h3>
                  </div>
                  <SecondBlock>
                     <ClarifyStyled>
                        Are you sure to delete this workspace ?
                     </ClarifyStyled>
                  </SecondBlock>
                  <ButtonContainerSecond>
                     <CanselButton onClick={openDeleteModal}>
                        Cancel
                     </CanselButton>
                     <DeleteButton onClick={deleteWorkspacesHandler}>
                        Delete
                     </DeleteButton>
                  </ButtonContainerSecond>
               </Container>
            </ModalUi>
         ) : null}
      </div>
   )
}
const Container = styled('div')(() => ({
   width: '22.9375rem',
   height: '11.125rem',
   borderRadius: '0.625rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}))

const SecondBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))
const SettingStyle = styled('span')(() => ({
   color: '#000',
   display: 'flex',
   justifyContent: 'center',
   fontSize: '1.3rem',
   marginBottom: '0.5rem',
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   gap: '1rem',
}))
const ButtonContainerSecond = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
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
   color: '#111',
   display: 'flex',
   justifyContent: 'center',
}))
const StyleModalUi = styled(ModalUi)(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: '12.625rem',
   bordeRadius: '0.625rem',
   background: '#FFF',
}))
const CanselButton = styled(Button)(() => ({
   height: '2.125rem',
   width: '4.885rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   backgroundColor: '#F0F0F0',
   textTransform: 'capitalize',
   color: '#919191',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      backgroundColor: '#b6b6b6',
      color: 'white',
   },
}))
const SaveButton = styled(Button)(() => ({
   height: '2.125rem',
   width: '4rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   textTransform: 'capitalize',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
   },
}))
const DeleteButton = styled(Button)(() => ({
   height: '2.125rem',
   width: '4.75rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
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
