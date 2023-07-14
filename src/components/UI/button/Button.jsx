import React from 'react'
import { Button as ReusebleButton, styled } from '@mui/material'

export const Button = ({ variant, onClick, children, ...rest }) => {
   return (
      <ButtonStyle type="submit" {...rest}>
         {children}
      </ButtonStyle>
   )
}

const ButtonStyle = styled(ReusebleButton)(({ ...props }) => ({
   backgroundColor: props.backgroundColor || '#0079BF',
   color: props.color || '#ffff',
   borderRadius: props.borderRadius || '1.6rem',
   display: 'inline-flex',
   padding: props.padding || '0.5rem 1rem',
   alignItems: 'flex-start',
   gap: '0.5rem',
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
