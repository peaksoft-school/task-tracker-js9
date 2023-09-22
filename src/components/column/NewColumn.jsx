import { styled } from '@mui/material'
import React from 'react'
import { CloseIcon } from '../../assets/icons'
import { Button } from '../UI/button/Button'
import { Input } from '../UI/input/Input'

export const NewColumn = ({
   handleInputChange,
   handleCreateColumnClick,
   handleAddColumnClick,
   newColumnName,
}) => {
   const isButtonDisabled = newColumnName === ''

   return (
      <div>
         <CreateColumn>
            <TitleOfCreateColumn>
               <NameOfColumn>Name of column</NameOfColumn>
               <CloseIcon
                  style={{ cursor: 'pointer' }}
                  onClick={handleAddColumnClick}
               />
            </TitleOfCreateColumn>
            <InputColumn
               type="text"
               placeholder=" Name"
               value={newColumnName}
               onChange={handleInputChange}
            />
            <ButtonCreateColumn
               disabled={isButtonDisabled}
               onClick={handleCreateColumnClick}
            >
               Create
            </ButtonCreateColumn>
         </CreateColumn>
      </div>
   )
}
const CreateColumn = styled('div')(() => ({
   width: '280px',
   height: '118px',
   display: 'flex',
   flexDirection: 'column',
   gap: '0.3rem',
   borderRadius: '0.5rem',
   background: '#FFF',
   // background: 'rgba(145, 145, 145, 0.11)',
   padding: '0.7rem',
}))
const TitleOfCreateColumn = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))
const NameOfColumn = styled('p')(() => ({
   fontSize: '16px',
   color: '#919191',
}))
const ButtonCreateColumn = styled(Button)(() => ({
   width: '4.8rem',
   height: '1.875rem',
   textTransform: 'inherit',
   marginLeft: '11.2rem',
   padding: '3px 16px 0 16px',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#fffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
      color: '#fffff',
   },
}))
const InputColumn = styled(Input)(() => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      width: '16rem',
   },
   input: {
      width: '19.4625rem',
      height: '1.35rem',
      padding: ' 0.375rem 1rem',
      alignItems: ' center',
      borderRadius: '0.5rem',
   },
}))
