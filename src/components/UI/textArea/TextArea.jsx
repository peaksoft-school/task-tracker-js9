import { TextField, styled } from '@mui/material'
import React, { forwardRef } from 'react'

export const TextArea = forwardRef(
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
   borderRadius: props.borderRadius,
   padding: props.padding,
}))
