import React from 'react'
import { styled } from '@mui/material'
import { Header } from '../header/Header'
import { WorkspaceTable } from './WorkspaceTable'
import { Button } from '../UI/button/Button'

export const Workspace = () => {
   return (
      <div>
         <Header />
         <div>
            <ContainerHead>
               <span>
                  <h3>Workspaces</h3>
               </span>
               <SaveButton>Create</SaveButton>
            </ContainerHead>
            <WorkspaceTable />
         </div>
      </div>
   )
}

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
const ContainerHead = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '1rem 4rem 0rem 4rem',
}))
