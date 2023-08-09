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
   backgroundColor: 'rgba(240, 230, 230, 0.464)',
   backdropFilter: 'blur(2px)',

   display: 'flex ',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100vh',
   position: 'absolute',
}))

const SpinerLoading = styled(CircularProgress)(() => ({
   position: 'fixed',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   zIndex: 9999,
}))
