import { styled } from '@mui/material'
import React from 'react'

export const ColumnColorGroup = ({ ...props }) => {
   return <Color props={props} />
}

const Color = styled('div')(({ props }) => ({
   width: '2.8125rem',
   height: ' 0.3125rem',
   backgroundColor: props.color,
   flexShrink: 0,
   borderRadius: ' 0.5rem',
   marginTop: '0.62rem',
   marginBottom: '0.62rem',
}))
