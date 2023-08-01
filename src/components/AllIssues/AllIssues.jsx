import React, { useState } from 'react'
import { Checkbox, FormControl, MenuItem, Select, styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AllIssuesTable } from './AllIssuesTable'
import { CommentSection } from '../UI/comments/CommentsSection'

export const AllIssues = () => {
   const [start, setStart] = useState(dayjs('2023-07-10'))
   const [value, setValue] = useState(dayjs('2023-09-17'))

   const [labels, setLabels] = useState('All Labels')

   const handleChange = (event) => {
      setLabels(event.target.value)
   }

   const dataLength = 24
   const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <MainCont>
                  <RoleSection>
                     <ViewAllIssues>View all issues</ViewAllIssues>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerStyle
                           value={start}
                           onChange={(newValue) => setStart(newValue)}
                           format="DD.MM.YYYY"
                        />
                        <DatePickerStyle
                           value={value}
                           onChange={(newValue) => setValue(newValue)}
                           format="DD.MM.YYYY"
                        />
                     </LocalizationProvider>
                     <div style={{ display: 'flex', gap: '1.3rem' }}>
                        <FormControl>
                           <StyledSelect value={labels} onChange={handleChange}>
                              <MenuItem disabled value="All Labels">
                                 All Labels
                              </MenuItem>
                              <CommentSection />
                           </StyledSelect>
                        </FormControl>
                        <FormControl>
                           <AssigneeSelect
                              value={labels}
                              onChange={handleChange}
                              defaultValue="All Labels"
                           >
                              <p>kd</p>
                           </AssigneeSelect>
                        </FormControl>
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '0.4rem',
                        }}
                     >
                        <Checkbox
                           sx={{
                              '& .MuiSvgIcon-root': { fontSize: 25 },
                              '&.Mui-checked': {
                                 color: ' #30a0d4',
                              },
                           }}
                           {...label}
                        />
                        <p
                           style={{
                              textTransform: 'capitalize',
                              color: '#464646',
                           }}
                        >
                           checklist
                        </p>
                     </div>
                  </RoleSection>
               </MainCont>
               <Total>
                  Total:<TotalAmount>{dataLength}</TotalAmount>
               </Total>
            </HeaderContainer>
            <AllIssuesTable />
         </GlobalContainer>
      </BodyContainer>
   )
}

const BodyContainer = styled('div')(() => ({
   padding: '0.75rem 1.25rem 0rem 1.25rem',
}))

const GlobalContainer = styled('div')(() => ({
   padding: '1.4rem 0 0 0',
   backgroundColor: '#f8f8f87a',
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
   height: '1.9rem',
   gap: '1.25rem',
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
   padding: '0 0.3125rem ',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.5rem',
   borderRadius: '1rem',
   background: ' #B2B2B2',
   color: '#fff',
}))

const DatePickerStyle = styled(DatePicker)(() => ({
   input: {
      width: '5.11rem',
      padding: ' 0.4rem 0.7rem 0.4rem 0.8rem',
      borderRadius: '0.5rem',
      fontFamily: 'CarePro',
   },
   button: {
      width: '0.3rem',
   },
   svg: {
      width: '1.1rem',
   },
   '& .MuiInputBase-root.MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      paddingRight: '1.2rem',
   },
}))

const StyledSelect = styled(Select)(() => ({
   fontFamily: 'CarePro',

   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: ' 0.4375rem 1rem 0.4375rem 1rem',
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

const AssigneeSelect = styled(Select)(() => ({
   fontFamily: 'CarePro',

   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: '  0.41rem 0.8rem 0.41rem 0.9rem',
      width: '13.6875rem',
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
