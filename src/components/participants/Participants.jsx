import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FormControl, styled } from '@mui/material'
import { Button } from '../UI/button/Button'
import { ParticipantsTable } from './ParticipantsTable'

export const Participants = ({ onDelete }) => {
   const [role, setRole] = useState()

   const handleChange = (event) => {
      setRole(event.target.value)
   }

   const dataLength = 254

   const selectData = [
      { label: 'All', value: 'All' },
      { label: 'Admin', value: 'Admin' },
      { label: 'Member', value: 'Member' },
   ]

   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <MainCont>
                  <RoleSection>
                     <ViewAllIssues>View all issues</ViewAllIssues>
                     <FormControl>
                        <StyledSelect value={role} onChange={handleChange}>
                           {selectData.map((item) => (
                              <StyledMenuItem
                                 key={item.value}
                                 value={item.value}
                              >
                                 {item.label}
                              </StyledMenuItem>
                           ))}
                        </StyledSelect>
                     </FormControl>
                  </RoleSection>
                  <MyBtnStyled>Create</MyBtnStyled>
               </MainCont>
               <Total>
                  Total:<TotalAmount>{dataLength}</TotalAmount>
               </Total>
            </HeaderContainer>
            <ParticipantsTable onDelete={onDelete} />
         </GlobalContainer>
      </BodyContainer>
   )
}

const BodyContainer = styled('div')(() => ({
   padding: '0.75rem 1.25rem 0rem 1.25rem',
   width: '100%',
}))

const GlobalContainer = styled('div')(() => ({
   padding: '1.4rem 0 0 0',
   backgroundColor: '#ffffff',
   width: '100%',
   minHeight: ' 10vh',
   borderRadius: ' 0.5rem',
   fontFamily: 'CarePro',
}))

const HeaderContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '0 1.4rem 1.5rem 1.4rem ',
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
   height: '1.2rem',
   gap: '1.88rem',
}))

const StyledSelect = styled(Select)(() => ({
   fontFamily: 'CarePro',

   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: '0.2rem 0.875rem 0.2rem 1rem',
      width: '5rem',
      borderColor: '#D0D0D0',
      '&:hover': {
         borderColor: '#8d8c8c',
      },
      '&.Mui-focused': {
         borderColor: '#0079BF',
      },
   },
   '&.MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      fieldset: {
         borderColor: '#D0D0D0',
      },
      '&:hover fieldset': {
         borderColor: '#8d8c8c',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#0079BF',
      },
   },
}))

const StyledMenuItem = styled(MenuItem)(() => ({
   fontFamily: 'CarePro',
}))

const ViewAllIssues = styled('p')(() => ({
   fontSize: '1.25rem',
   fontWeight: ' 600',
}))

const Total = styled('p')(() => ({
   color: '#919191',
   fontSize: '1rem',
   fontWeight: ' 400',
}))

const TotalAmount = styled('span')(() => ({
   marginLeft: '0.5rem ',
   display: 'inline-flex',
   padding: '0.1rem 0.3125rem ',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.5rem',
   borderRadius: '1rem',
   background: 'var(--secondary-gray-2, #B2B2B2)',
   color: '#fff',
}))

const MyBtnStyled = styled(Button)(() => ({
   fontFamily: 'CarePro',
   color: '#fff',
   borderRadius: ' 1.5rem',
   width: '5rem',
   padding: '0.4rem 2rem 0.4rem 2rem',
   textAlign: 'center',
   fontSize: '0.91rem',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#015c91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
}))
