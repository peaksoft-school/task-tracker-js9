import React from 'react'
import { Button as MyButton, styled } from '@mui/material'

export const Button = ({ variant, onClick, children, ...rest }) => {
   return (
      <ButtonStyle
         type="submit"
         variant={variant}
         onClick={onClick}
         startIcon
         icon
         {...rest}
      >
         {children}
      </ButtonStyle>
   )
}

const ButtonStyle = styled(MyButton)(({ ...props }) => ({
   backgroundColor: props.backgroundColor || '#0079BF',
   color: props.color || '#ffff',
   borderRadius: props.borderRadius || '24px',
   width: props.width || '154px',
   display: 'inline-flex',
   padding: props.padding || '8px 16px',
   alignItems: 'flex-start',
   gap: '8px',
   '&:hover': {
      backgroundColor: props.backgroundColor,
      color: props.color,
   },
   '&:active': {
      backgroundColor: props.backgroundColor,
   },
   '&:disabled': {
      backgroundColor: '#B2B2B2',
      color: 'FFFFFF',
   },
}))
