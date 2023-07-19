import React, { useState } from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { IconButton } from '@mui/material'
import {
   DownIcon,
   Logo,
   NotificationIcon,
   PersonIcon,
   SearchIcon,
   UpIcon,
} from '../../assets/icons'

export const Header = () => {
   const [isIconUp, setIsIconUp] = useState(false)

   const handleIconClick = () => {
      setIsIconUp(!isIconUp)
   }
   return (
      <GLobalContainer>
         <LogoContainer>
            <Logotype src={Logo} alt="task-tracker_logo" />
            <LogoWords>Task Tracker</LogoWords>
            <Favorite>
               <ParagraphFavorite>Favourites (2)</ParagraphFavorite>
               <IconButton onClick={handleIconClick}>
                  {isIconUp ? (
                     <UpIcon src={UpIcon} alt="up_arrow" />
                  ) : (
                     <DownIcon src={DownIcon} alt="down_arrow" />
                  )}
               </IconButton>
            </Favorite>
         </LogoContainer>
         <AboutPanel>
            <Search>
               <SearchIconWrapper>
                  <SearchIcon src={SearchIcon} alt="Search_Icon" />
               </SearchIconWrapper>
               <StyledInputBase
                  placeholder="Search"
                  inputProps={{ CarePro: 'search' }}
               />
            </Search>
            <NotificationIcon src={NotificationIcon} alt="natifacation" />
            <PersonIcon src={PersonIcon} alt="person_Icon" />
         </AboutPanel>
      </GLobalContainer>
   )
}

const GLobalContainer = muiStyled('header')(() => ({
   width: '100%',
   height: ': 4.25rem',
   backgroundColor: '#ffffff',
   padding: '1rem 2.5rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}))

const LogoContainer = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
}))

const LogoWords = muiStyled('h1')(() => ({
   color: '#0079bf',
   fontFamily: 'Open Sans',
   fontSize: '1.25rem',
   fontWeight: '600',
}))
const Favorite = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   marginLeft: '5rem',
}))

const ParagraphFavorite = muiStyled('p')(() => ({
   fontFamily: 'CarePro',
   color: '#3e3e3e',
   fontSize: '1rem',
   fontWeight: '500',
}))

const Logotype = muiStyled(Logo)(() => ({
   width: '3.5vw',
   height: '6.2vh',
}))

const AboutPanel = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '1.8rem',
}))

const Search = muiStyled('div')(({ theme }) => ({
   position: 'relative',
   display: 'flex',
   alignItems: 'center',
   border: '1px solid #D0D0D0',
   color: ' #161616',
   borderRadius: 8,
   backgroundColor: '#fff',
   '&:hover': {
      border: '1.3px solid #0079bf',
   },
   '&:active': {
      border: '1.3px solid #858585',
   },
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
   },
}))

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2.3),
   height: '100%',
   position: 'absolute',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      borderRadius: 8,
      padding: theme.spacing(1.3, 18, 1.3, 0),
      paddingLeft: `calc(1em + ${theme.spacing(5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
   },
}))
