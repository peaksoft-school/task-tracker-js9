import { styled } from '@mui/material'
import { Columns } from './Columns'

export const Column = () => {
   return (
      <ColumnsStyle>
         <Columns />
      </ColumnsStyle>
   )
}

const ColumnsStyle = styled('div')(() => ({
   display: 'flex',
   gap: '1.5rem',
   marginTop: '100px',
   backgroundColor: 'white',
}))
