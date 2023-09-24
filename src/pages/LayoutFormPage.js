import { styled } from '@mui/material'
import ImageInLogoPage from '../assets/images/ImageInLogoPage.png'
import TaskLogo from '../assets/images/TaskLogo.svg'

export const LayoutFormPage = ({ children }) => {
   return (
      <Container>
         <div style={{ position: 'absolute', top: '0', left: '0' }}>
            <img style={{ margin: '1rem ' }} src={TaskLogo} alt="logo" />
         </div>
         <MainWrapper>
            {children}

            <ImageLogoPage src={ImageInLogoPage} alt="Logo" />
         </MainWrapper>
      </Container>
   )
}

const Container = styled('header')(() => ({
   width: '90rem;',
   display: 'flex',
   justifyContent: 'center ',
   margin: '0 auto',
   position: 'relative',
}))

const MainWrapper = styled('div')(() => ({
   display: 'flex',
   gap: '4rem ',
   marginLeft: '10rem',
}))

const ImageLogoPage = styled('img')(() => ({
   width: '37.3125rem',
   height: '100vh',
}))
