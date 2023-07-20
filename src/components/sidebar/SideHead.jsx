import React, { useState } from 'react'
import {
   Avatar,
   Box,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   styled,
} from '@mui/material'
import {
   DownIcon,
   LayoutWhite,
   LeftIcon,
   PlusIcon,
   TemplateIcon,
} from '../../assets/icons'

export const SideHead = ({
   open,
   data,
   activeItem,
   handleItemClick,
   menuItems,
}) => {
   const [toggleButton, setToggleButton] = useState(false)
   const toggleButtonHadler = () => {
      setToggleButton(!toggleButton)
   }
   return (
      <div>
         <List>
            <ListItem disablePadding>
               <ListItemButton>
                  <StyleListItemIcon>
                     {open ? (
                        <LeftIcon fill="3C3C3C" />
                     ) : (
                        <AvatarStyledHeader
                           sx={{ bgcolor: '#0079BF' }}
                           alt="photo"
                        >
                           <p>
                              <p style={{ fontSize: '1.3rem' }}>
                                 {data.name[0]}
                              </p>
                           </p>
                        </AvatarStyledHeader>
                     )}
                  </StyleListItemIcon>

                  <ListItemText primary={data.name} />
               </ListItemButton>
            </ListItem>
            <List />
            <DividerStyle open={open} />
            <List>
               <ActiveListItem
                  open={open}
                  disablePadding
                  selected={activeItem === 'board'}
                  onClick={() => handleItemClick('board')}
               >
                  <ListItemButton>
                     <StyleListItemIcon>
                        {activeItem === 'board' ? (
                           <LayoutWhite />
                        ) : (
                           <TemplateIcon fill="#3C3C3C" />
                        )}
                     </StyleListItemIcon>
                     <ListItemText primary="Board" />
                     <StyleListItemIcon>
                        {activeItem === 'board' ? (
                           <PlusIcon fill="white" />
                        ) : (
                           <PlusIcon fill="3C3C3C" />
                        )}
                     </StyleListItemIcon>
                     {activeItem === 'board' ? (
                        <DownIcon onClick={toggleButtonHadler} fill="white" />
                     ) : (
                        <DownIcon onClick={toggleButtonHadler} fill="3C3C3C" />
                     )}
                  </ListItemButton>
               </ActiveListItem>
               {toggleButton ? (
                  <Box
                     display="flex"
                     alignItems="center"
                     sx={{ marginLeft: '1.3rem' }}
                  >
                     <DividerStyleItem orientation="vertical" flexItem />
                     <ListItemStyleTitle disablePadding>
                        <ListItemButton>
                           <ListItemText primary="Item 1" />
                        </ListItemButton>
                     </ListItemStyleTitle>
                  </Box>
               ) : null}
            </List>
         </List>
         <DividerStyle open={open} />
         <List>
            {menuItems.map((menuItems) => (
               <ActiveListItem
                  open={open}
                  key={menuItems.text}
                  disablePadding
                  selected={activeItem === menuItems.text}
                  onClick={() => handleItemClick(menuItems.text)}
               >
                  <ListItemButton>
                     <StyleListItemIcon>{menuItems.icon}</StyleListItemIcon>
                     <ListItemText
                        primary={
                           <MenuItemStyles
                              style={{
                                 color:
                                    activeItem === menuItems.text
                                       ? 'white'
                                       : '#3C3C3C',
                              }}
                           >
                              {menuItems.text}
                              {menuItems.count && (
                                 <span>({menuItems.count})</span>
                              )}
                           </MenuItemStyles>
                        }
                     />
                  </ListItemButton>
               </ActiveListItem>
            ))}
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
const MenuItemStyles = styled('div')(() => ({
   width: '96%',
   display: 'flex',
   justifyContent: 'space-between',
}))

const DividerStyle = styled(Divider)(({ open }) => ({
   width: open ? '75%' : '35%',
   marginLeft: '1.8rem',
   borderBottom: '2px solid #E0E0E0',
}))

const DividerStyleItem = styled(Divider)(() => ({
   marginLeft: '4.33rem',
   marginTop: '0.4rem',
   borderBottom: '2px solid #E0E0E0',
}))

const StyleListItemIcon = styled(ListItemIcon)(() => ({
   '&.MuiListItemIcon-root ': {
      minWidth: '3.4rem',
      marginLeft: '1.2rem',
   },
}))

const ListItemStyleTitle = styled(ListItem)(() => ({
   '&.MuiListItem-root ': {
      marginRight: '2rem',
   },
}))

const AvatarStyledHeader = styled(Avatar)(() => ({
   width: '2.2rem',
   height: '2.2rem',
   color: '#F0F0F0',
   padding: ' 0.3125rem 0.8125rem',
   marginLeft: '  -0.5rem',
}))
