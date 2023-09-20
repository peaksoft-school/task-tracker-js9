import React from 'react'
import { styled } from '@mui/material'

export const ColumnCard = ({ children }) => {
   return <ColumnCardStyle>{children}</ColumnCardStyle>
}

const ColumnCardStyle = styled('div')(() => ({
   width: '16.8rem',
   background: '#ffffff',
   marginBottom: '1rem',
   borderRadius: ' 0.25rem',
   paddingRight: '0.4rem',
   paddingTop: '0.5rem',
}))
