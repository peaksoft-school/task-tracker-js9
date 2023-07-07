import { createTheme } from '@mui/material'

export const theme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#3f51b5',
         white: '#FFFFFF',
         black: '#111111',
         blue: '#0079BF',
      },
      secondary: {
         main: '#f50057',
         gray: '#919191',
         gray2: '#B2B2B2',
         lightGray: '#F0F0F0',
      },
      tertiary: {
         red: '#D91212',
         green: '#2CB107',
         green2: '#66C74B',
      },
   },
})
