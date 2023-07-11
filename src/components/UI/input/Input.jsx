import { TextField, styled } from '@mui/material'
import React, { forwardRef } from 'react'

export const Input = forwardRef(
   ({ type, borderRadius, placeholder, ...props }, ref) => {
      return (
         <StyledInput
            type={type}
            ref={ref}
            placeholder={placeholder}
            {...props}
         />
      )
   }
)

const StyledInput = styled(TextField)((props) => ({
   width: props.width,
   marginLeft: '25%',
   marginTop: '100px',
   border: props.border,
   '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      height: props.height,
      padding: props.padding,
   },
   '& .css-1qi90xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: props.borderRadiuss,
   },
}))
