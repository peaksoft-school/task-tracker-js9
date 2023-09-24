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
   width: '17.5rem',
   borderRadius: '0.5rem',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   backgroundColor: '#ffffff',
   position: 'relative',
   // background: 'rgba(145, 145, 145, 0.67)',
}))
