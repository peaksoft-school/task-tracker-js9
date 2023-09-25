import { styled } from '@mui/material'
import React from 'react'
import { ExitIcon } from '../../assets/icons'

export const Label = () => {
   return (
      <div style={{ display: 'flex' }}>
         <LabelContain>
            <P> vuasv</P>
            <ExitIcon />
         </LabelContain>
      </div>
   )
}

const LabelContain = styled('button')(() => ({
   padding: ' 0.25rem 0.375rem 0.25rem 0.625rem',
   borderRadius: ' 0.375rem',
   background: 'green',
   display: 'flex',
}))

const P = styled('p')(() => ({
   color: '#FFF',
   fontFamily: 'CeraPro',
   fontSize: '1rem',
   fontWeight: 500,
}))
