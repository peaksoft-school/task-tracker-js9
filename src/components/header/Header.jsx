import React, { useEffect, useState } from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { Avatar, IconButton } from '@mui/material'
import {
   Outlet,
   useNavigate,
   NavLink,
   useLocation,
   // useParams,
} from 'react-router-dom'
import { useDebounce } from 'use-debounce'
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
import { searchRequest } from '../../store/globalSearch/searchThunk'
import { GlobalSearch } from './GlobalSearch'
import { SearchHistory } from './SearchHistory'
import { Notification } from './Notification'
import { profileGetRequest } from '../../store/profile/ProfileThunk'

export const Headers = () => {
   const [showModal, setShowModal] = useState(false)
   const [search, setSearch] = useState('')
   const [openProfile, setOpenProfile] = useState(false)
   const [searchValue] = useDebounce(search, 100)
   const [showAdditionalComponent, setShowAdditionalComponent] = useState(false)
   const [showNotifications, setShowNotifications] = useState(false)

   const { favoriteData } = useSelector((state) => state.favorite)
   const { globalSearch } = useSelector((state) => state.search)
   const { item } = useSelector((state) => state.profile)
   console.log('avatarLink: ', item)

   const boardLength = favoriteData.data?.boardResponses?.length || 0
   const workSpaceLength = favoriteData.data?.workSpaceResponses?.length || 0
   const sumLength = boardLength + workSpaceLength

   const [favoriteSum, setFavoriteSum] = useState(0)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      dispatch(profileGetRequest())
   }, [])

   useEffect(() => {
      if (sumLength > 0) {
         setFavoriteSum(sumLength)
      }
   }, [sumLength])

   useEffect(() => {
      if (searchValue.trim().length > 0) {
         dispatch(searchRequest(search))
         setShowAdditionalComponent(false)
      }
   }, [searchValue])
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
      dispatch(logOut())
         .unwrap()
         .then(() => {
            showSnackbar({
               message: 'Log out successful!',
               severity: 'success',
            })
            navigate('/')
            location.reload()
         })
         .catch((error) => {
            return error.message
         })
   }

   const searchHandler = (e) => {
      setSearch(e.target.value)
   }
   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(searchRequest(search))
   }

   const notificationHandler = () => {
      setShowNotifications((prev) => !prev)
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
               <div style={{ positon: 'relative' }}>
                  <Search onSubmit={handleSubmit}>
                     <SearchIconWrapper>
                        <SearchIcon src={SearchIcon} alt="Search_Icon" />
                     </SearchIconWrapper>

                     <StyledInputBase
                        placeholder="Search"
                        type="text"
                        value={search}
                        onChange={searchHandler}
                        onFocus={() => setShowAdditionalComponent(true)}
                     />
                  </Search>
                  {showAdditionalComponent ? (
                     <>
                        <BackDrop
                           onClick={() => setShowAdditionalComponent(false)}
                        />
                        <SearchHistory />
                     </>
                  ) : null}
                  {search.length > 0 && (
                     <GlobalSearch globalSearch={globalSearch} />
                  )}
               </div>
               <IconButton onClick={notificationHandler}>
                  <NotificationIcon src={NotificationIcon} alt="notification" />
               </IconButton>
               {showNotifications && (
                  <Notification notificationHandler={notificationHandler} />
               )}
               <WrapperTexts>
                  {item?.avatar === 'Default image' ? (
                     <Avatar />
                  ) : (
                     <StyledAvatar onClick={openProfileHandler}>
                        <img
                           style={{ width: '100%', height: '100%' }}
                           src={item?.avatar}
                           alt=""
                        />
                     </StyledAvatar>
                  )}
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

const Search = muiStyled('form')(({ theme }) => ({
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

const BackDrop = muiStyled('div')(() => ({
   width: '100%',
   height: '98vh',
   position: 'absolute',
   top: '0',
   left: '0',
}))
