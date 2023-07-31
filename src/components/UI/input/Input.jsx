import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import React, { forwardRef } from 'react'

export const Input = forwardRef(
   ({ label, type, id, value, onChange, placeholder, ...other }, ref) => {
      return (
         <MyStyledInput
            size="small"
            label={label}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            {...other}
         />
      )
   }
)

const MyStyledInput = styled(TextField)((props) => ({
   input: {
      padding: 0,
      width: 0,
      backgroundColor: 'white',
      borderRadius: 0,
      height: 0,
   },

   '& label.Mui-focused': {
      color: '#6d6d6d',
   },
   '& label': {
      fontSize: '1rem',
      fontFamily: 'CarePro',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
   },
   '& .MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill': {
      borderRadius: '0.25rem',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
         borderRadius: '0.25rem',
      },
      '&:hover fieldset': {
         border: props.border || '1px solid #0079BF',
      },
      '&.Mui-focused fieldset': {
         border: props.border || '1px solid #999898',
      },
   },
}))
