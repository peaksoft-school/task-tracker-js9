import { styled } from '@mui/material'
import { CardInColumn } from './Card'

export const Column = () => {
   return (
      <ParentColumnStyle>
         <ColumnStyle>
            <CardInColumn />
         </ColumnStyle>
      </ParentColumnStyle>
   )
}

const ParentColumnStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '50px',
}))

const ColumnStyle = styled('div')(() => ({
   width: '17.5rem',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   paddingLeft: '0.5rem',
}))
