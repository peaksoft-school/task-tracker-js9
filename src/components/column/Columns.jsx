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
   width: '18rem',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '0.9rem',
   paddingTop: '0.5rem',
   // paddingRight: '0.5rem',
   maxHeight: '100%',
   position: 'relative',
   // zIndex: 1,
   background: '#E6E6E6',
}))
