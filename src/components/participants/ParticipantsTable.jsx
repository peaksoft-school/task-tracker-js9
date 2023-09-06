import React, { useState } from 'react'
import {
   FormControl,
   IconButton,
   MenuItem,
   Select,
   styled,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { putParticipans } from '../../store/participants/partThunk'
import TableMui from '../UI/table/TableMui'
import { DeleteIcon } from '../../assets/icons'

const kindaSelect = [
   { label: 'Admin', value: 'ADMIN' },
   { label: 'Member', value: 'MEMBER' },
]

export const ParticipantsTable = ({ onDelete, rows }) => {
   const dispatch = useDispatch()
   const { partId } = useParams()

   const defaultRole = 'Member'

   const initialRoles = {}
   rows.forEach((row) => {
      initialRoles[row.userId] = defaultRole
   })

   const [roles, setRoles] = useState(initialRoles)

   const handleRolesChange = (event, memberId) => {
      const newRoles = { ...roles }
      newRoles[memberId] = event.target.value
      setRoles(newRoles)
      dispatch(
         putParticipans({
            memberId,
            workSpacesId: partId,
            role: event.target.value,
         })
      )
   }

   const column = [
      {
         heading: 'Name',
         key: 'name',
         align: 'left',
         minWidth: '33rem',
         padding: '0 0 0 1.6rem',
         render: (data) => (
            <p style={{ padding: '0 0 0 0.6rem' }}>{data.fullName}</p>
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
                     value={data.role}
                     onChange={(e) => handleRolesChange(e, data.userId)}
                  >
                     {kindaSelect.map((item) => (
                        <MenuItemStyle
                           key={item.value}
                           defaultValue={data.role}
                           value={item.value}
                        >
                           {item.label}
                        </MenuItemStyle>
                     ))}
                  </StyledSelect>
               </FormControlStyle>
               <IconButton onClick={() => onDelete(data.userId)}>
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
