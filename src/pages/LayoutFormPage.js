import { styled } from '@mui/material'
// import { Routes, Route } from 'react-router-dom'
import ImageInLogoPage from '../assets/images/ImageInLogoPage.png'
import TaskLogo from '../assets/images/TaskLogo.svg'

export const LayoutFormPage = ({ children }) => {
   return (
      <Container>
         <div>
            <img style={{ margin: '1rem ' }} src={TaskLogo} alt="" />
         </div>
         <MainWrapper>
            {children}

            <ImageLogoPage src={ImageInLogoPage} alt="Logo" />
         </MainWrapper>
      </Container>
   )
}

const Container = styled('header')(() => ({
   width: '100%;',
   display: 'flex',
   justifyContent: 'space-between',
}))

const MainWrapper = styled('div')(() => ({
   display: 'flex',
   gap: '4rem ',
   // justifyContent: 'space-between',
}))

const ImageLogoPage = styled('img')(() => ({
   width: '37.3125rem',
   // width: '100vw',
   height: '100vh',
   // overflow: 'hidden',
   marginRight: '4.69rem',
}))
