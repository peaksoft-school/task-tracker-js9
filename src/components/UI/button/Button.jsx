import React from 'react'
import { Button as ReusableButton, styled } from '@mui/material'

export const Button = ({
   variant,
   onClick,
   children,
   startIcon,
   icon,
   ...rest
}) => {
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

const ButtonStyle = styled(ReusableButton)(({ ...props }) => ({
   backgroundColor: props.backgroundColor || '#0079BF',
   color: props.color || '#ffffff',
   borderRadius: props.borderRadius || '1.6rem',
   display: 'inline-flex',
   padding: props.padding || '0.5rem 1rem',
   alignItems: 'flex-start',
   // gap: '0.5rem',
   '&:hover': {
      backgroundColor: props.backgroundColor,
      color: props.color,
   },
   '&:active': {
      backgroundColor: props.backgroundColor,
   },
   '&:disabled': {
      backgroundColor: '#B2B2B2',
      color: '#FFFFFF',
   },
}))
