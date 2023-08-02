import { styled } from '@mui/material'
import React from 'react'
import { Card } from './Card'

export const Columns = () => {
   return (
      <ColumnStyle>
         <Card />
      </ColumnStyle>
   )
}

const ColumnStyle = styled('div')(() => ({
   width: '17.5rem',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   paddingLeft: '0.5rem',
}))
