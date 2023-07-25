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
// import { render } from '@testing-library/react'

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
]

const kindaSelect = [
   { label: 'All', value: 'All' },
   { label: 'Admin', value: 'Admin' },
   { label: 'Member', value: 'Member' },
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
      {
         heading: 'Name',
         key: 'name',
         align: 'left',
         minWidth: '33rem',
         padding: '0 0 0 1.6rem',
         render: (data) => (
            <p style={{ padding: '0 0 0 0.6rem' }}>{data.name}</p>
         ),
      },

      { heading: 'Email', key: 'email', minWidth: '10rem' },

      {
         heading: 'Role',
         align: 'right',
         render: (data) => (
            <MainContainer>
               <FormControlStyle>
                  <StyledSelect
                     value={roles[data.id]}
                     onChange={(e) => handleRolesChange(e, data.id)}
                  >
                     {kindaSelect.map((item) => (
                        <MenuItemStyle key={item.value} value={item.value}>
                           {item.label}
                        </MenuItemStyle>
                     ))}
                  </StyledSelect>
               </FormControlStyle>
               <IconButton onClick={() => onDelete(data.id)}>
                  <DeleteIcon />
               </IconButton>
            </MainContainer>
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
   height: '100vh',
}))
const MainContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   alignItems: 'center',
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
