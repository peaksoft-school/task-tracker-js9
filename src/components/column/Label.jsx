import React from 'react'
import { styled } from '@mui/material'

export const Label = ({ ...props }) => {
   return <Color onClick={props.onClick} props={props} />
}

const Color = styled('div')(({ props }) => ({
   width: '2.8125rem',
   height: ' 0.3125rem',
   backgroundColor: props.color,
   flexShrink: 0,
   borderRadius: ' 0.5rem',
   marginTop: '0.62rem',
   marginBottom: '0.62rem',
   cursor: 'pointer',
}))
