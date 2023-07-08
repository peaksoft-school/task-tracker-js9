import React from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import searchIcon from '../../assets/icons/searchIcon.svg'
import logo from '../../assets/icons/Logo.svg'
import communications from '../../assets/icons/communication.svg'
import personLogo from '../../assets/icons/person_icon.svg'
import arrowDown from '../../assets/icons/Arrows.svg'

export const Header = () => {
   return (
      <GLobalContainer>
         <LogoContainer>
            <Logo src={logo} alt="task-tracker_logo" />
            <h1>Task Tracker</h1>
            <Favorite>
               <p>Favourites (2)</p>
               <img src={arrowDown} alt="arrow" />
            </Favorite>
         </LogoContainer>
         <AboutPanel>
            <Search>
               <SearchIconWrapper>
                  <img src={searchIcon} alt="Search_Icon" />
               </SearchIconWrapper>
               <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'Cera Pro': 'search' }}
               />
            </Search>
            <img src={communications} alt="natifacation" />
            <img src={personLogo} alt="person_Icon" />
         </AboutPanel>
      </GLobalContainer>
   )
}

const GLobalContainer = muiStyled('div')(() => ({
   width: '100%',
   height: '68px',
   backgroundColor: '#ffffff',
   padding: '16px 40px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}))

const LogoContainer = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
   h1: {
      color: '#0079bf',
      fontFamily: 'Open Sans',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
   },
}))
const Favorite = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   marginLeft: '80px',
   p: {
      color: '#3e3e3e',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 'normal',
   },
}))

const Logo = muiStyled('img')(() => ({
   width: '36px',
   height: '36px',
}))

const AboutPanel = muiStyled('div')(() => ({
   display: 'flex',
   gap: '28px',
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
