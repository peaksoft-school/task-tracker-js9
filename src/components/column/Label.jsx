import React from 'react'
import { styled } from '@mui/material'

export const Label = ({ ...props }) => {
   return (
      <Color onClick={props.onClick} props={props} className="slide-bottom" />
   )
}

const Color = styled('div')(({ props }) => ({
   width: '2.8125rem',
   height: ' 0.3125rem',
   backgroundColor: props.color,
   flexShrink: 0,
   borderRadius: ' 0.5rem',
   cursor: 'pointer',
   '-webkit-transition': 'width 0.3s 0s ease-out, all 0.5s 0s ease',
   '-moz-transition': 'width 0.3s 0s ease-out, all 0.5s 0s ease',
   '-o-transition': 'width 0.3s 0s ease-out ,all 0.5s 0s ease',
   transition: 'width 0.3s 0s ease-out, all 0.5s 0s ease',
   marginBottom: '0.75rem',
   '&:active': {
      transform: 'scale(2, 0.9)',
   },
}))
