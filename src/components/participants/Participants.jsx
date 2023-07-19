import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FormControl, styled } from '@mui/material'
import { Button } from '../UI/button/Button'

export const Participants = () => {
   const [role, setRole] = useState('All')

   const handleChange = (event) => {
      setRole(event.target.value)
   }

   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <RoleSection>
                  <ViewAllIssues>View all issues</ViewAllIssues>
                  <FormControl>
                     <Selectt value={role} onChange={handleChange}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Member">Member</MenuItem>
                     </Selectt>
                  </FormControl>
               </RoleSection>
               <Button>Create</Button>
            </HeaderContainer>
            <Total>Total</Total>
         </GlobalContainer>
      </BodyContainer>
   )
}

const BodyContainer = styled('div')(() => ({
   padding: '0.75rem 1.25rem 0rem 1.25rem',

   backgroundColor: '#F0F0F0',
   width: '100%',
   height: '100vh',
}))

const GlobalContainer = styled('div')(() => ({
   padding: '1.4rem',
   backgroundColor: '#F8F8F8',
   width: '100%',
   height: ' 17.8125rem',
}))

const HeaderContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))

const RoleSection = styled('div')(() => ({
   display: 'flex',
   alignContent: 'center',
}))

const Selectt = styled(Select)(() => ({
   '& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {},

   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: '0.2rem 0.875rem 0.2rem 1rem',
      width: '5rem',
      borderColor: '#D0D0D0',
   },
}))

const ViewAllIssues = styled('h3')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1.25rem',
   fontWeight: ' 500',
}))

const Total = styled('p')(() => ({
   fontFamily: 'CarePro',
   color: '#919191',
   fontSize: '1rem',
   fontWeight: ' 400',
}))
