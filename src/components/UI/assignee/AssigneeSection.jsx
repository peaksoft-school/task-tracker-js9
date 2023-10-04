import { Avatar, Checkbox, InputBase, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Person } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SearchIcon } from '../../../assets/icons'
import { fetchParticipans } from '../../../store/participants/partThunk'
// import { getSearchMembers } from '../../../store/get-all-issues/get.all.issuesThunk'

export const AssigneeSection = ({ changeHandler, AssigneeHandleChange }) => {
   const dispatch = useDispatch()
   const [, setAnchorEl] = useState(null)
   const [, setToogle] = useState(false)
   const [search, setSearch] = useState('')
   const { id } = useParams()
   const { participants } = useSelector((state) => state.participant)
   console.log('participants: ', participants)
   // const { memberSearch } = useSelector((state) => state.allIssues)

   const handleCheckboxClick = (userId) => {
      changeHandler(userId)
      AssigneeHandleChange(userId)
   }
   const handleUnassignedClick = () => {
      AssigneeHandleChange('')
   }
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      setToogle(true)
   }

   useEffect(() => {
      dispatch(fetchParticipans({ id, role: 'ALL' }))
   }, [id, dispatch])

   const filteredParticipants = participants?.filter((item) => {
      const fullName = item.fullName.toLowerCase()
      const email = item.email.toLowerCase()
      const searchTerm = search.toLowerCase()

      const fullNameMatch = fullName.match(new RegExp(searchTerm, ''))
      const emailMatch = email.match(new RegExp(searchTerm, ''))

      return fullNameMatch !== null || emailMatch !== null
   })
   console.log('filteredParticipants:', filteredParticipants)

   return (
      <MainContainerOfAssignee>
         <Search>
            <SearchIconWrapper>
               <SearchIcon
                  style={{ position: 'relative', left: '11.5rem' }}
                  src={SearchIcon}
                  alt="Search_Icon"
               />
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </Search>
         <div style={{ marginTop: '1rem' }}>
            <ScrollableContainer>
               <UnassignedContainer
                  onClick={handleUnassignedClick}
                  aria-describedby={id}
               >
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
               {filteredParticipants?.map((item) => {
                  // return el.participantsResponseList?.map((item) => {
                  return (
                     <AssigneeMapContainer key={item.userId}>
                        <Checkbox
                           sx={{
                              '&.Mui-checked': {
                                 color: '#5faed0',
                              },
                           }}
                           onClick={() => handleCheckboxClick(item.userId)}
                        />
                        <Avatar src={item.image} />
                        <div>
                           <p
                              style={{
                                 fontSize: '0.9rem',
                              }}
                           >
                              {item.fullName}
                           </p>
                           <PeoplesEmail>{item.email}</PeoplesEmail>
                        </div>
                     </AssigneeMapContainer>
                  )
               })}
               {/* )} */}
               {/* )} */}
            </ScrollableContainer>
         </div>
      </MainContainerOfAssignee>
   )
}

const MainContainerOfAssignee = styled('div')(() => ({
   width: ' 22.6rem',
   height: '32rem',
   padding: '1rem',
   borderRadius: '0.625rem',
}))

const Search = styled('form')(({ theme }) => ({
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
   width: '19.75rem',
   gap: '0.3rem',
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
   width: '19.75rem',
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
