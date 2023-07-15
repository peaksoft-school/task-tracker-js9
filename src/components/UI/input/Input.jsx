import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { useRef } from 'react'

export function Input({
   label,
   type,
   id,
   value,
   onChange,
   placeholder,
   ...other
}) {
   const ref = useRef()
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

const MyStyledInput = styled(TextField)(() => ({
   input: {
      padding: 0,
      width: 0,
      backgroundColor: 'white',
      borderRadius: 13,
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
      borderRadius: 13,
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
         borderRadius: 13,
      },
      '&:hover fieldset': {
         border: '1px solid #0079BF',
      },
      '&.Mui-focused fieldset': {
         border: '1px solid #a3a3a3',
      },
   },
}))
