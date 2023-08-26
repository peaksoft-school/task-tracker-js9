import React, { useEffect, useState } from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { Avatar, IconButton } from '@mui/material'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
   DownIcon,
   Logo,
   NotificationIcon,
   SearchIcon,
   UpIcon,
} from '../../assets/icons'
import { logOut } from '../../store/auth/authThunk'
import { showSnackbar } from '../UI/snackbar/Snackbar'
import { Favourite } from '../favourite/Favourite'
import { ModalUi } from '../UI/modal/Modal'

export const Headers = ({ data }) => {
   const [showModal, setShowModal] = useState(false)
   const [openProfile, setOpenProfile] = useState(false)

   const { favoriteData } = useSelector((state) => state.favorite)

   const boardLength = favoriteData.data?.boardResponses?.length || 0
   const workSpaceLength = favoriteData.data?.workSpaceResponses?.length || 0
   const sumLength = boardLength + workSpaceLength

   const [favoriteSum, setFavoriteSum] = useState(0)

   useEffect(() => {
      if (sumLength > 0) {
         setFavoriteSum(sumLength)
      }
   }, [sumLength])

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   const openFavoriteModalHandler = () => {
      setShowModal(!showModal)
   }

   const openProfileHandler = () => {
      setOpenProfile((prev) => !prev)
   }

   const handleModalContentClick = (event) => {
      event.stopPropagation()
   }
   const logOutHandler = () => {
      console.log('logout')
      dispatch(logOut(), navigate)
         .unwrap()
         .then(() => {
            showSnackbar({
               message: 'Log out successful!',
               severity: 'success',
            })
            navigate('/')
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <div>
         <GLobalContainer>
            <LogoContainer>
               <Logotype
                  onClick={() => navigate('/mainPage')}
                  src={Logo}
                  alt="task-tracker_logo"
               />
               <LogoWords onClick={() => navigate('/mainPage')}>
                  Task Tracker
               </LogoWords>
               <Favorite>
                  <ParagraphFavorite>
                     Favourites ({favoriteSum})
                  </ParagraphFavorite>
                  <IconButton onClick={openFavoriteModalHandler}>
                     {showModal ? (
                        <>
                           <UpIcon src={UpIcon} alt="up_arrow" />
                           <ModalUi
                              handleModalContentClick={handleModalContentClick}
                              onClose={openFavoriteModalHandler}
                              open={showModal}
                           >
                              <Favourite setShowModal={setShowModal} />
                           </ModalUi>
                        </>
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
                  <StyledInputBase placeholder="Search" type="search" />
               </Search>
               <IconButton>
                  <NotificationIcon src={NotificationIcon} alt="notification" />
               </IconButton>
               <WrapperTexts>
                  <StyledAvatar onClick={openProfileHandler}>
                     {data}
                  </StyledAvatar>
                  {openProfile ? (
                     <ProfileTexts>
                        {location.pathname !== '/profile' && (
                           <NavLink to="/profile">Profile</NavLink>
                        )}
                        <p onClick={logOutHandler}>Log out</p>
                     </ProfileTexts>
                  ) : null}
               </WrapperTexts>
            </AboutPanel>
         </GLobalContainer>
         <Outlet />
      </div>
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
   position: 'fixed',
   zIndex: 990,
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
   cursor: 'pointer',
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
   cursor: 'pointer',
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
   fontFamily: 'CarePro',
   color: 'inherit',

   '& .MuiInputBase-input': {
      borderRadius: 8,
      padding: theme.spacing(1.3, 1.3, 1.3, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '27rem',
   },
}))

const StyledAvatar = muiStyled(Avatar)(() => ({
   cursor: 'pointer',
}))

const ProfileTexts = muiStyled('div')(() => ({
   width: '10rem',
   height: '5rem',
   backgroundColor: '#FFF',
   color: '#000000',
   position: 'absolute',
   right: '-17px',
   top: '3rem',
   zIndex: '100',
   borderRadius: '0.625rem',
   border: '1px solid #919191',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'start',
   padding: '1rem 4.75rem 1rem 1.5rem',
   gap: '0.75rem',
   '& p': {
      cursor: 'pointer',
   },
   animation: ` fadeInAnimation 0.5s ease-in-out`,
   '@keyframes fadeInAnimation': {
      '0%': {
         opacity: 0,
         transform: 'translateY(-30px)',
      },
      '100%': {
         opacity: 1,
         transform: 'translateY(0)',
      },
   },
}))
const WrapperTexts = muiStyled('div')(() => ({
   color: '#000000;',
   position: 'relative',
   zIndex: '100',
   borderRadius: '0.625rem',
}))
