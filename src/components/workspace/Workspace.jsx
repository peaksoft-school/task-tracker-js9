import React, { useState } from 'react'
import { styled } from '@mui/material'
import { WorkspaceTable } from './WorkspaceTable'
import { Button } from '../UI/button/Button'
import NewWorkspaceForm from './WorkspaceModal'

export const Workspaces = () => {
   const [showModal, setShowModal] = useState(false)

   const openCloseModalHandler = () => {
      setShowModal(!showModal)
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
         <NewWorkspaceForm showModal={showModal} setShowModal={setShowModal} />
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
