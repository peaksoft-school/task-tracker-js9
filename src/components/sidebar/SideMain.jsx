import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Avatar,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   styled,
} from '@mui/material'
import { DownIcon, GraphicIcon, PlusIcon, UpIcon } from '../../assets/icons'
import { fetchAllWorkspaces } from '../../store/workspace/workspaceThunk'
// import { fetchBoards } from '../../store/board/boardThunk'

export const SideMain = ({
   open,
   activeItem,
   handleItemClick,
   menuItemsWorspace,
   navigateHandlerToWorkspace,
}) => {
   const [workspaceId, setWorkspaceId] = useState(null)
   const [showMore, setShowMore] = useState(false)
   const dispatch = useDispatch()
   // const navigate = useNavigate()

   const toggleButtonHadler = (id) => {
      setWorkspaceId(id)
      if (workspaceId === id) {
         setWorkspaceId(null)
      }
   }
   const showMoreHandler = () => {
      setShowMore(!showMore)
   }

   const { workspaces } = useSelector((state) => state.workspaces)

   useEffect(() => {
      dispatch(fetchAllWorkspaces())
   }, [dispatch])

   // const navigateHandlerToWorkspace = (workSpaceId) => {
   //    navigate(`/mainPage/${workSpaceId}/boards`)
   //    dispatch(fetchBoards(workSpaceId))
   // }

   return (
      <div style={{ textShadow: '0  0 10px #fff' }}>
         <List>
            <ActiveListItem
               open={open}
               disablePadding
               selected={activeItem === 'Workspaces'}
               onClick={() => handleItemClick('Workspaces')}
            >
               <ListItemButton>
                  <StyleListItemIcon>
                     {activeItem === 'Workspaces' ? (
                        <GraphicIcon fill="#FFFFFF" />
                     ) : (
                        <GraphicIcon fill="#3C3C3C" />
                     )}
                  </StyleListItemIcon>
                  <ListItemText primary="Workspaces" />
                  <StyleListItemIconPlus>
                     {activeItem === 'Workspaces' ? (
                        <PlusIcon fill="#FFFFFF" />
                     ) : (
                        <PlusIcon fill="#3C3C3C" />
                     )}
                  </StyleListItemIconPlus>
               </ListItemButton>
            </ActiveListItem>

            <ListSummaryStyle>
               {workspaces
                  .slice(0, showMore ? workspaces.length : 4)
                  .map((item) => (
                     <>
                        <Accounting>
                           <AccountingListItemIcon key={item.workSpaceName}>
                              <StyledForSpace>
                                 <StyledAvatar
                                    sx={{ bgcolor: '#2CB107' }}
                                    alt="photo"
                                 >
                                    <span style={{ fontSize: '1.3rem' }}>
                                       {item.workSpaceName[0]}
                                    </span>
                                 </StyledAvatar>
                                 <StyledAccountingText
                                    onClick={() =>
                                       navigateHandlerToWorkspace(
                                          item.workSpaceId
                                       )
                                    }
                                 >
                                    {item.workSpaceName}
                                 </StyledAccountingText>
                              </StyledForSpace>
                              <StyledForSpaceSecond>
                                 <DownIcon
                                    onClick={() =>
                                       toggleButtonHadler(item.workSpaceId)
                                    }
                                    fill="3C3C3C"
                                    style={{
                                       marginLeft: '4.1rem',
                                       cursor: 'pointer',
                                    }}
                                 />
                              </StyledForSpaceSecond>
                           </AccountingListItemIcon>
                        </Accounting>
                        {workspaceId === item.workSpaceId ? (
                           <ListStyled>
                              {menuItemsWorspace.map((item) => (
                                 <ListItemStyle>
                                    <StyleListItemIconPlus
                                       sx={{
                                          marginRight: '0.4rem',
                                       }}
                                    >
                                       {item.icon}
                                    </StyleListItemIconPlus>

                                    <StyledListItemText>
                                       {item.text}
                                    </StyledListItemText>
                                    <ListItemIcon
                                       fill="3C3C3C"
                                       sx={{ marginLeft: '5.8rem' }}
                                    >
                                       {item.iconn}
                                    </ListItemIcon>
                                 </ListItemStyle>
                              ))}
                           </ListStyled>
                        ) : null}
                     </>
                  ))}
            </ListSummaryStyle>

            {workspaces.length > 4 && (
               <ListItemStyle>
                  <ListItemIcon>
                     {showMore ? (
                        <UpIcon onClick={showMoreHandler} fill="919191" />
                     ) : (
                        <DownIcon onClick={showMoreHandler} fill="919191" />
                     )}
                  </ListItemIcon>
                  <StyledListItemText>Show more</StyledListItemText>
               </ListItemStyle>
            )}
         </List>
      </div>
   )
}

const ActiveListItem = styled(ListItem)(({ open }) => ({
   width: open ? '15rem' : '5.25rem',
   height: '2.3125rem',
   borderRadius: '0rem 1.5rem 1.5rem 0rem',
   '&:active': {
      borderRadius: '0rem 1.5rem 1.5rem 0rem',
      color: 'white',
   },
   '&:hover': {
      borderRadius: '0rem 1.5rem 1.5rem 0rem',
      backgroundColor: '#E6EAED',
   },
   '&.MuiListItem-root.Mui-selected': {
      backgroundColor: 'rgba(58, 104, 131, 0.60)',
      color: 'white',
   },
}))

const ListSummaryStyle = styled(ListItem)(() => ({
   display: 'flex',
   flexDirection: 'column',
   '&.MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-pwcg7p-MuiCollapse-root ':
      {
         minHeight: '10%',
         marginLeft: '4.4rem',
         marginTop: '-0.88rem',
      },
}))
const ListStyled = styled(ListItem)(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginRight: '0.4rem',
   cursor: 'pointer',
}))
const StyledForSpace = styled('div')(() => ({
   display: 'flex',
   gap: '1.9rem',
   width: '5.6rem',
   justifyContent: 'space-between',
}))
const StyledForSpaceSecond = styled('div')(() => ({
   marginTop: '0.4rem',
}))

const StyleListItemIcon = styled(ListItemIcon)(() => ({
   display: 'flex',
   '&.MuiListItemIcon-root ': {
      minWidth: '3.4rem',
      marginLeft: '1.2rem',
   },
}))
const AccountingListItemIcon = styled(ListItemIcon)(() => ({
   '&.MuiListItemIcon-root ': {
      display: 'flex',
      justifyContent: 'space-around',
   },
}))
const Accounting = styled(ListItem)(() => ({
   '&.MuiListItem-root ': {
      display: 'flex',
      width: '100%',
      marginLeft: '2.2rem',
      cursor: 'pointer',
   },
}))
const StyledListItemText = styled(ListItemText)(() => ({
   '&.MuiListItemText-root css-1rl1smr-MuiListItemText-root': {
      fontSize: '0.2rem',
      color: '#919191',
      fontWeight: '400',
   },
}))
const StyledAccountingText = styled(ListItemText)(() => ({
   color: '#3C3C3C',
   minWidth: '6.8rem',
   overflowX: 'auto',

   '::-webkit-scrollbar': {
      width: '8px',
      height: '2px',
   },

   '::-webkit-scrollbar-thumb': {
      backgroundColor: '#e4e4e4',
      borderRadius: '4px',
   },

   '::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
   },
}))
const ListItemStyle = styled(ListItem)(() => ({
   '&.MuiListItem-root ,MuiListItem-root MuiListItem-gutters MuiListItem-padding css-bjvhst-MuiListItem-root':
      {
         marginLeft: '1.4rem',
         marginTop: '-0.88rem',
      },
}))

const StyleListItemIconPlus = styled(ListItemIcon)(() => ({
   '&.MuiListItemIcon-root ': {
      minWidth: '01rem',
      marginLeft: '2rem',
   },
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '1.625rem',
   height: '1.5625rem',
   color: '#F0F0F0',
   padding: '0.6rem 0.6rem 0.6rem 0.6rem',
   bgcolor: '#2CB107',
   marginLeft: '  -1rem',
}))
