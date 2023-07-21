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

const rows = [
   {
      name: 'Aiturgan Isaeva',
      email: 'isaevasai7@example.com',
      id: '4',
   },
   {
      name: 'Zhakshylyk Nasipbekov',
      email: 'nasipbekov04zhakshylyk@example.com',
      id: '5',
   },
   {
      name: 'Beku Kursanov',
      email: 'kursanovbeku@example.com',
      id: '6',
   },
   {
      name: 'Ali Samatov',
      email: 'alisamatov@example.com',
      id: '7',
   },
]

export const ParticipantsTable = ({ onDelete }) => {
   const defaultRole = 'Member'

   const initialRoles = {}
   rows.forEach((row) => {
      initialRoles[row.id] = defaultRole
   })

   const [roles, setRoles] = useState(initialRoles)

   const handleRolesChange = (event, id) => {
      const newRoles = { ...roles }
      newRoles[id] = event.target.value
      setRoles(newRoles)
   }

   const column = [
      { heading: 'Name', key: 'name', minWidth: '40rem' },

      { heading: 'Email', key: 'email', minWidth: '20rem' },
      {
         render: (data) => (
            <FormControlStyle>
               <StyledSelect
                  value={roles[data.id]}
                  onChange={(e) => handleRolesChange(e, data.id)}
               >
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
         <TableMui column={column} rows={rows} />
      </Container>
   )
}

const Container = styled('div')(() => ({
   width: '100%',
   height: '100%',
}))
const MenuItemStyle = styled(MenuItem)(() => ({
   fontFamily: 'CarePro',
}))

const FormControlStyle = styled(FormControl)(() => ({
   width: '7.5rem',
}))

const StyledSelect = styled(Select)(() => ({
   fontFamily: 'CarePro',
   fieldset: {
      border: 'none',
   },
}))
