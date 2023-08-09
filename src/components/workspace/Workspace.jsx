import React from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { WorkspaceTable } from './WorkspaceTable'
import { Button } from '../UI/button/Button'

export const Workspaces = () => {
   const { isAuthorization, role } = useSelector((state) => state.auth)
   console.log('role: ', role)
   console.log('isAuthorization: ', isAuthorization)

   return (
      <div>
         <div>
            <ContainerHead>
               <span>
                  <h3>Workspaces</h3>
               </span>
               <SaveButton>Create</SaveButton>
            </ContainerHead>
            <Div>
               <WorkspaceTable />
            </Div>
         </div>
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
const Div = styled('div')(() => ({
   padding: '1rem 2rem 0rem 2rem',
}))
