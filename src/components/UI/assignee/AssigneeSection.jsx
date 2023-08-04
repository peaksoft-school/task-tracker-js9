import { Avatar, Checkbox, InputBase, styled } from '@mui/material'
import React, { useState } from 'react'
import { Person } from '@mui/icons-material'
import { SearchIcon } from '../../../assets/icons'
import { assignee } from '../../../utils/constants/assignee'
import { BackgroundChanger } from './BackgroundChanger'

export const AssigneeSection = () => {
   const [anchorEl, setAnchorEl] = useState(null)
   const [toogle, setToogle] = useState(false)

   const [, setSelectedUserId] = useState(null)

   const handleCheckboxClick = (id) => {
      setSelectedUserId(id)
   }

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      setToogle(true)
   }

   const handleClose = () => {
      setAnchorEl(null)
      setToogle(false)
   }

   const handleUnassignedClick = () => {
      setToogle(false)
   }

   const open = Boolean(anchorEl)
   const id = open ? 'simple-popover' : undefined

   return (
      <MainContainerOfAssignee>
         <Search>
            <SearchIconWrapper>
               <SearchIcon
                  style={{ position: 'relative', left: '10rem' }}
                  src={SearchIcon}
                  alt="Search_Icon"
               />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" />
         </Search>
         <div style={{ marginTop: '1rem' }}>
            <ScrollableContainer>
               {toogle && (
                  <BackgroundChanger
                     open={open}
                     onClose={handleClose}
                     handleUnassignedClick={handleUnassignedClick}
                     id={id}
                     anchorEl={anchorEl}
                  />
               )}

               <UnassignedContainer aria-describedby={id}>
                  <Checkbox
                     sx={{
                        '&.Mui-checked': {
                           color: '#6abc37',
                        },
                     }}
                  />
                  <UnassignedChildContainer onClick={handleClick}>
                     <Avatar>
                        <Person />
                     </Avatar>
                     <p>Unassigned</p>
                  </UnassignedChildContainer>
               </UnassignedContainer>
               {assignee.map((el) => (
                  <AssigneeMapContainer key={el.id}>
                     <Checkbox
                        sx={{
                           '&.Mui-checked': {
                              color: '#5faed0',
                           },
                        }}
                        onClick={() => handleCheckboxClick(el.id)}
                     />
                     <Avatar src={el.img} />
                     <div>
                        <p>{el.name}</p>
                        <PeoplesEmail>{el.email}</PeoplesEmail>
                     </div>
                  </AssigneeMapContainer>
               ))}
            </ScrollableContainer>
         </div>
      </MainContainerOfAssignee>
   )
}

const MainContainerOfAssignee = styled('div')(() => ({
   width: ' 21.6rem',
   height: '32rem',
   padding: '1rem',
   borderRadius: '0.625rem',
}))

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   display: 'flex',
   alignItems: 'center',
   border: '1px solid #D0D0D0',
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
      marginLeft: theme.spacing(0.8),
      width: 'auto',
   },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 13),
   height: '100%',
   position: 'absolute',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   fontFamily: 'CarePro',
   color: 'inherit',
   '& .MuiInputBase-input': {
      borderRadius: 8,
      padding: theme.spacing(0.9, 0, 1, 0.5),
      paddingLeft: `calc(1em + ${theme.spacing(0.3)})`,
      transition: theme.transitions.create('width'),
      width: '14.8rem',
   },
}))

const ScrollableContainer = styled('div')(() => ({
   padding: '0.3rem 0.3rem',
   height: ' 25rem ',
   overflowY: 'auto ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #d9d9d9 transparent',

   ' &::-webkit-scrollbar ': {
      width: '0.5rem',
   },

   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },

   ' &::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #d9d9d9',
      borderRadius: '0.25rem',
   },
}))

const AssigneeMapContainer = styled('div')(() => ({
   display: 'flex',
   height: '3.5rem',
   width: '17.75rem',
   gap: '0.63rem',
   padding: '0.5rem 2rem 0 0 ',
   cursor: 'pointer',
   '&:hover': {
      backgroundColor: '#e6e6e6',
   },
}))
const PeoplesEmail = styled('p')(() => ({
   color: '#919191',
}))

const UnassignedContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '17.75rem',
   height: '3.5rem',
   background: ' #F2F2F2',
   cursor: 'pointer',
}))
const UnassignedChildContainer = styled('div')(() => ({
   marginLeft: '0.6rem',
   display: 'flex',
   alignItems: 'center',
   gap: '0.54rem',
}))
