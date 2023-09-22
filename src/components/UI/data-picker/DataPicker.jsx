import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DateField } from '@mui/x-date-pickers/DateField'
import { styled as MUIStyled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Button } from '../button/Button'
import {
   estimationPostRequest,
   estimationPutRequest,
} from '../../../store/dataPicjers/estimationThunk'

export const DataPickers = ({
   setSelectedDate,
   selectedDate,
   setСlock,
   clock,
   due,
   setDue,
   cardId,
   currentHour,
   currentMinute,
   setOpenEstimation,
}) => {
   const dispatch = useDispatch()
   const [reminder, setReminder] = useState('')

   const { cardById } = useSelector((state) => state.cards)

   const mode = cardById.estimationResponse.estimationId

   const handleCreate = () => {
      const data = {
         cardId,
         reminder: '',
         startDate: selectedDate.toISOString(),
         dateOfFinish: due.toISOString(),
         startTime: currentHour,
         currentMinute,
         finishTime: clock.toISOString(),
      }
      dispatch(estimationPostRequest(data))
      console.log('data: ', data)
      setOpenEstimation(false)
   }

   const handleUpdate = () => {
      const data = {
         estimationId: cardById.estimationResponse.estimationId,
         reminder: '',
         startDate: selectedDate.toISOString(),
         dateOfFinish: due.toISOString(),
         startTime: currentHour,
         currentMinute,
         finishTime: clock.toISOString(),
      }
      dispatch(estimationPutRequest(data))
      console.log('data: ', data)
      setOpenEstimation(false)
   }

   return (
      <MainDateContainer>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
               value={selectedDate}
               onChange={(date) => setSelectedDate(date)}
            />
            <DateContainer>
               <DateLabel htmlFor="startDate">Start Date</DateLabel>
               <StartDatePanel
                  name="startDate"
                  value={selectedDate}
                  format="DD/MM/YYYY"
               />
               <DateLabel htmlFor="dueDate">Due Date</DateLabel>
               <DateAndTimeContainer>
                  <DueDatePanel
                     name="dueDate"
                     value={due}
                     onChange={(newValue) => setDue(newValue)}
                     format="DD/MM/YYYY"
                  />
                  <TimePicker
                     value={clock}
                     onChange={(newValue) => setСlock(newValue)}
                     // format="HH:mm "
                  />
               </DateAndTimeContainer>
               <SelectContainer>
                  <DateLabel htmlFor="demo-simple-select-label">
                     Set due date reminder
                  </DateLabel>

                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     defaultValue="None"
                     value={reminder}
                     onChange={(e) => setReminder(e.target.value)}
                     MenuProps={{
                        PaperProps: {
                           style: {
                              maxHeight: 145,
                              overflowY: 'scroll',
                           },
                        },
                     }}
                  >
                     <MenuItem value="None">None</MenuItem>
                     <MenuItem value="5min">5 min. before</MenuItem>
                     <MenuItem value="15min">15 min. before</MenuItem>
                     <MenuItem value="60min">1 hour before</MenuItem>
                  </Select>
               </SelectContainer>
               {mode ? (
                  <StyledButton onClick={handleUpdate}>
                     update a new template
                  </StyledButton>
               ) : (
                  <StyledButton onClick={handleCreate}>
                     create a new template
                  </StyledButton>
               )}
            </DateContainer>
         </LocalizationProvider>
      </MainDateContainer>
   )
}

const MainDateContainer = MUIStyled('div')(() => ({
   padding: '0 1rem 1rem 0',
   width: '19.75rem',
   position: 'absolute',
   height: '41rem',
   boxSizing: 'border-box',
   zIndex: '999',
   top: '0',
   backgroundColor: '#FFFF',
   borderRadius: '0.625rem',
   '.MuiInputBase-input.MuiOutlinedInput-input': {
      padding: ' 0.5rem 0.875rem 0.5rem 1rem',
   },
   '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      borderColor: ' #D0D0D0',
   },
   '.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      borderColor: ' #D0D0D0',
   },
   '.css-i4bv87-MuiSvgIcon-root': {
      fontSize: '1.25rem',
   },
}))

const DateContainer = MUIStyled('div')(() => ({
   marginLeft: '1.125rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))

const DateLabel = MUIStyled('label')(() => ({
   color: ' #919191',
   fontSize: '0.9375rem',
   fontWeight: '400',
   marginTop: '0.6rem',
   fontFamily: 'CarePro',
}))

const DateAndTimeContainer = MUIStyled('div')(() => ({
   display: 'flex',
   gap: '1rem',
}))

const StartDatePanel = MUIStyled(DateField)(() => ({
   width: '7.1875rem',
}))
const DueDatePanel = MUIStyled(DateField)(() => ({
   width: '16.875rem',
}))

const SelectContainer = MUIStyled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
   marginBottom: '1.3rem',
   '.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
      width: '16.6875rem',
      borderRadius: '0.5rem',
      borderColor: ' #D0D0D0',
   },
}))

const StyledButton = MUIStyled(Button)(() => ({
   width: '17.65rem',
   padding: '0.375rem 1rem',
   color: '#FFF',
   fontFamily: 'CarePro',
   fontSize: ' 0.975rem',
   '&:hover': {
      backgroundColor: '#035c8f',
   },
   '&:active': {
      backgroundColor: '#0079BF',
   },
}))
