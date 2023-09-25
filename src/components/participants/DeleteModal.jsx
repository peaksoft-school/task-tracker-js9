import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ModalUi } from '../UI/modal/Modal'
import { removeParticipants } from '../../store/participants/partThunk'
import { Button } from '../UI/button/Button'

export const DeleteModal = ({ onDelete, role, userId }) => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const onClickDelete = () => {
      dispatch(
         removeParticipants({
            userId,
            workSpacesId: id,
            role,
         })
      )
      onDelete()
   }
   return (
      <ModalUi open={onDelete} onClose={onDelete}>
         <StyleModalUi>
            <SettingStyle>Delete user</SettingStyle>
            <ClarifyStyled>Are you sure to delete this user?</ClarifyStyled>
            <ButtonContainerSecond>
               <CanselButton onClick={onDelete}>Cancel</CanselButton>
               <DeleteButton onClick={onClickDelete}>Delete</DeleteButton>
            </ButtonContainerSecond>
         </StyleModalUi>
      </ModalUi>
   )
}

const ClarifyStyled = styled('span')(() => ({
   fontSize: '1rem',
   color: '#919191',
   display: 'flex',
   justifyContent: 'center',
   marginTop: '1rem',
}))
const StyleModalUi = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   // alignItems: 'center',
   width: '20rem',
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

const ButtonContainerSecond = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   marginTop: '2.5rem',
   gap: '1rem',
}))
const SettingStyle = styled('span')(() => ({
   fontSize: '1rem',
   color: '#000',
   display: 'flex',
   justifyContent: 'center',
   marginBottom: '1rem',
}))
