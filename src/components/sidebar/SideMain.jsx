import React, { useState } from 'react'
import {
   Avatar,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   styled,
} from '@mui/material'
import { DownIcon, GraphicIcon, PlusIcon } from '../../assets/icons'

export const SideMain = ({
   open,
   activeItem,
   handleItemClick,
   workspacedata,
   menuItemsWorspace,
}) => {
   const [workspaceId, setWorkspaceId] = useState(null)
   const [showMore, setShowMore] = useState(false)

   const toggleButtonHadler = (id) => {
      setWorkspaceId(id)
      if (workspaceId === id) {
         setWorkspaceId(null)
      }
   }
   const showMoreHandler = () => {
      setShowMore(!showMore)
   }
   return (
      <div>
         <DividerStyle open={open} />
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
                        <GraphicIcon fill="3C3C3C" />
                     )}
                  </StyleListItemIcon>
                  <ListItemText primary="Workspaces" />
                  <StyleListItemIconPlus>
                     {activeItem === 'Workspaces' ? (
                        <PlusIcon fill="#FFFFFF" />
                     ) : (
                        <PlusIcon fill="3C3C3C" />
                     )}
                  </StyleListItemIconPlus>
               </ListItemButton>
            </ActiveListItem>

            <ListSummaryStyle>
               {workspacedata
                  .slice(0, showMore ? workspacedata.length : 6)
                  .map((item) => (
                     <>
                        <ListItem>
                           <StyleListItemIcon key={item.name}>
                              <StyledAvatar
                                 sx={{ bgcolor: '#2CB107' }}
                                 alt="photo"
                              >
                                 <span style={{ fontSize: '1.3rem' }}>
                                    {item.name[0]}
                                 </span>
                              </StyledAvatar>
                              <ListItemTextStyled>
                                 {item.name}{' '}
                              </ListItemTextStyled>
                              <DownIcon
                                 onClick={() => toggleButtonHadler(item.id)}
                                 fill="3C3C3C"
                                 style={{ marginLeft: '4.1rem' }}
                              />
                           </StyleListItemIcon>
                        </ListItem>
                        {workspaceId === item.id ? (
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
                                    <StyleListItemIconPlus
                                       sx={{ marginRight: '0.8rem' }}
                                    >
                                       {item.iconn}
                                    </StyleListItemIconPlus>
                                 </ListItemStyle>
                              ))}
                           </ListStyled>
                        ) : null}
                     </>
                  ))}
            </ListSummaryStyle>

            {workspacedata.length > 6 && (
               <ListItemStyle>
                  <ListItemIcon>
                     <DownIcon onClick={showMoreHandler} fill="919191" />
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

const DividerStyle = styled(Divider)(({ open }) => ({
   width: open ? '75%' : '35%',
   marginLeft: '1.8rem',
   borderBottom: '2px solid #E0E0E0',
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
   marginLeft: '0.5rem',
}))

const StyleListItemIcon = styled(ListItemIcon)(() => ({
   display: 'flex',
   '&.MuiListItemIcon-root ': {
      minWidth: '3.4rem',
      marginLeft: '1.2rem',
   },
}))
const ListItemTextStyled = styled(ListItemText)(() => ({
   '&.MuiListItemText-root ': {
      minWidth: '3.4rem',
      marginLeft: '1.7rem',
      color: '#111',
   },
}))
const StyledListItemText = styled(ListItemText)(() => ({
   '&.MuiListItemText-root css-1rl1smr-MuiListItemText-root': {
      fontSize: '0.2rem',
      color: '#919191',
      fontWeight: '400',
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
   padding: '0.7rem 0.6rem 0.6rem 0.6rem',
   bgcolor: '#2CB107',
   marginLeft: '  -1rem',
}))
