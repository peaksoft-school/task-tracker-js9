import React from 'react'
import { styled } from '@mui/material'

export const ColumnCard = ({ children }) => {
   return <ColumnCardStyle>{children}</ColumnCardStyle>
}

const ColumnCardStyle = styled('div')(() => ({
   width: '16.5rem',
   background: '#F4F4F4',
   borderRadius: ' 0.25rem',
   paddingLeft: '0.5rem',
   paddingRight: '0.5rem',
   paddingBottom: '0.63rem',
   paddingTop: '0.63rem',
}))
