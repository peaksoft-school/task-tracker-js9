import React, { useState } from 'react'
import {
   FormControl,
   IconButton,
   MenuItem,
   Select,
   styled,
} from '@mui/material'
import TableMui from '../UI/table/TableMui'
import { DeleteIcon } from '../../assets/icons'

export const ParticipantsTable = ({ onDelete }) => {
   const [roles, setRoles] = useState('Member')

   const handleRolesChange = (event) => {
      setRoles(event.target.value)
   }
   const rows = [
      {
         name: 'John Smith',
         email: 'john.smith@example.com',

         id: '1',
      },
      {
         name: 'Jane Doe',
         email: 'jane.doe@example.com',
         id: '2',
      },
      {
         name: 'Bob Johnson',
         email: 'bob.johnson@example.com',
         id: '3',
      },
   ]
   const column = [
      { heading: 'Name', key: 'name', minWidth: '40rem' },

      { heading: 'Email', key: 'email', minWidth: '20rem' },
      {
         render: () => (
            <FormControlStyle>
               <StyledSelect value={roles} onChange={handleRolesChange}>
                  <MenuItemStyle value="All">All</MenuItemStyle>
                  <MenuItemStyle value="Admin">Admin</MenuItemStyle>
                  <MenuItemStyle value="Member">Member</MenuItemStyle>
               </StyledSelect>
            </FormControlStyle>
         ),
      },

      {
         heading: 'Role',
         align: 'right',
         render: (data) => (
            <IconButton onClick={() => onDelete(data.id)}>
               <DeleteIcon />
            </IconButton>
         ),
      },
   ]

   return (
      <Container>
         <TableMui key={rows.id} column={column} rows={rows} />
      </Container>
   )
}

const Container = styled('div')(() => ({
   width: '100%',
   height: '100%',
}))
const MenuItemStyle = styled(MenuItem)(() => ({
   // fontFamily: 'CarePro',
}))

const FormControlStyle = styled(FormControl)(() => ({
   width: '7.5rem',
}))

const StyledSelect = styled(Select)(() => ({
   // fontFamily: 'CarePro',
   fieldset: {
      border: 'none',
   },
}))
