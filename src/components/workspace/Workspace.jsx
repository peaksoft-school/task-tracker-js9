import React from 'react'
import { styled } from '@mui/material'
import { WorkspaceTable } from './WorkspaceTable'
import { Button } from '../UI/button/Button'
import NewWorkspaceForm from './WorkspaceModal'
import { useModal } from '../../hooks/useModal'

export const Workspaces = () => {
   const { isActive, setActive } = useModal()

   const openCloseModalHandler = () => {
      setActive(true)
   }
   const closeModal = () => {
      setActive(false)
   }
   return (
      <div>
         <ContainerHead>
            <span>
               <h3>Workspaces</h3>
            </span>
            <SaveButton onClick={openCloseModalHandler}>Create</SaveButton>
         </ContainerHead>
         <TableContainer>
            <WorkspaceTable />
         </TableContainer>
         <NewWorkspaceForm showModal={isActive} setShowModal={closeModal} />
      </div>
   )
}

const SaveButton = styled(Button)(() => ({
   height: '2.125',
   width: '4.8125rem',
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
const ContainerHead = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '1rem 2rem 0rem 2.5rem',
}))
const TableContainer = styled('div')(() => ({
   padding: '1rem 2rem 0rem 2rem',
}))
