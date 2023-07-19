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
   const dataLength = 254
   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <MainCont>
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
               </MainCont>
               <Total>
                  Total:<TotalAmount>{dataLength}</TotalAmount>
               </Total>
            </HeaderContainer>
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
   flexDirection: 'column',
}))

const MainCont = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}))

const RoleSection = styled('div')(() => ({
   display: 'flex',
   alignContent: 'center',
   margin: '0',
   height: '1rem',
}))

const Selectt = styled(Select)(() => ({
   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: '0.2rem 0.875rem 0.2rem 1rem',
      width: '5rem',
      borderColor: '#D0D0D0',
   },
}))

const ViewAllIssues = styled('p')(() => ({
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

const TotalAmount = styled('span')(() => ({
   display: 'inline-flex',
   padding: '0rem 0.3125rem ',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.5rem',
   borderRadius: '1rem',
   background: 'var(--secondary-gray-2, #B2B2B2)',
   color: '#fff',
}))
