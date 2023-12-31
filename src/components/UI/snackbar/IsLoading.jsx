import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

export default function IsLoading() {
   return (
      <Container>
         <Box sx={{ display: 'flex' }}>
            <SpinerLoading />
         </Box>
      </Container>
   )
}

const Container = styled('div')(() => ({
   backgroundColor: 'rgba(240, 230, 230, 0.292)',
   backdropFilter: 'blur(3px)',
   display: 'flex ',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100vw',
   height: '100vh',
   position: 'absolute',
   zIndex: 99999999,
   top: '0',
   left: '0',
}))

const SpinerLoading = styled(CircularProgress)(() => ({
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   zIndex: '999',
}))
