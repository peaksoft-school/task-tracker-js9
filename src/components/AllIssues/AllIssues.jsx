import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, MenuItem, Select, styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { AllIssuesTable } from './AllIssuesTable'
import { AssigneeSection } from '../UI/assignee/AssigneeSection'
import { LabelForFilter } from '../UI/filteredLabel/LabelForFilter'
import { getAllIssues } from '../../store/get-all-issues/get.all.issuesThunk'
import { useModal } from '../../hooks/useModal'

export const AllIssues = () => {
   const [startDate, setStartDate] = useState(null)
   const [dueDate, setDueDate] = useState(null)
   const [assignee, setAssignee] = useState('')
   const [checked, setChecked] = useState(false)
   const [labels, setLabels] = useState('')
   const [isActive, setActive] = useModal()
   const dispatch = useDispatch()
   const { id } = useParams()

   const dataLength = 24

   const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

   const handleStartDateChange = (date) => {
      setStartDate(date)
      setActive(true)
   }

   const handleDueDateChange = (date) => {
      setDueDate(date)
      setActive(true)
   }

   const AssigneeHandleChange = (event) => {
      setAssignee(event.target.value)
   }

   const handleCheckboxChange = (event) => {
      setChecked(event.target.checked)
   }

   const handleLabelChange = (label) => {
      setLabels(label)
   }

   useEffect(() => {
      console.log('labels: ', labels)
      const filterParams = {
         from: startDate?.toISOString(),
         to: dueDate?.toISOString(),
         assignees: assignee,
         label: labels,
         check: checked,
      }

      dispatch(getAllIssues({ id, filterParams }))
   }, [startDate, dueDate, labels, assignee, checked, dispatch, id])

   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <MainCont>
                  <RoleSection>
                     <ViewAllIssues>View all issues</ViewAllIssues>

                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerStyle
                           value={startDate}
                           onChange={handleStartDateChange}
                           format="DD.MM.YYYY"
                           disableFuture={Boolean(dueDate)}
                           isActive={isActive}
                        />

                        <DatePickerStyle
                           value={dueDate}
                           onChange={handleDueDateChange}
                           format="DD.MM.YYYY"
                           disablePast={Boolean(startDate)}
                           isActive={isActive}
                        />
                     </LocalizationProvider>

                     <MainFormControlContainer>
                        <FormControl>
                           <LabelForFilter
                              handleLabelChange={handleLabelChange}
                           />
                        </FormControl>
                        <FormControl>
                           <AssigneeSelect
                              value={assignee}
                              onChange={AssigneeHandleChange}
                           >
                              <MenuItem
                                 style={{ fontFamily: 'CarePro' }}
                                 disabled
                                 value="Assignee"
                              >
                                 Assignee
                              </MenuItem>
                              <AssigneeSection workspaceId={id} />
                           </AssigneeSelect>
                        </FormControl>
                     </MainFormControlContainer>
                     <CheckConatainer>
                        <Checkbox
                           checked={checked}
                           onChange={handleCheckboxChange}
                           sx={{
                              '& .MuiSvgIcon-root': { fontSize: 25 },
                              '&.Mui-checked': {
                                 color: ' #39abe0',
                              },
                           }}
                           {...label}
                        />
                        <p>checklist</p>
                     </CheckConatainer>
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
   // padding: '0.76rem 1.25rem 0rem 1.25rem',
   marginTop: '5rem',
   width: '100%',
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
   padding: ' 0.5rem 0.5rem 1.6rem 0.5rem',
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
   gap: '1.2rem',
}))

const ViewAllIssues = styled('p')(() => ({
   fontSize: '1.25rem',
   fontWeight: ' 600',
   width: '8.5rem',
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
      width: '5.31rem',
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

const MainFormControlContainer = styled('div')(() => ({
   display: 'flex',
   gap: '1.3rem',
}))

const CheckConatainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   p: { textTransform: 'capitalize', color: '#464646' },
}))
