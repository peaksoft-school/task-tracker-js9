import { styled } from '@mui/material'

import { Card } from './Card'

export const Columns = ({ column }) => {
   return (
      <ColumnStyle>
         <Card column={column} />
      </ColumnStyle>
   )
}

const ColumnStyle = styled('div')(() => ({
   width: '18.5rem',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   maxHeight: '100%',
   position: 'relative',
   // zIndex: 1,
   background: '#E6E6E6',
}))
