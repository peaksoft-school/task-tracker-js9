import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { SideHead } from './SideHead'
import { SideMain } from './SideMain'

import {
   FilesAndFoldersIcon,
   PeopleIcon,
   PlusIcon,
   TemplateIcon,
   ToolsIcon,
   SecondMenu,
   FirstMenu,
} from '../../assets/icons'

export function Sidenav({ data, dataLength, workspacedata }) {
   const [openDrawer, setOpenDrawer] = useState(false)
   const [activeItem, setActiveItem] = useState(null)
   const [toggle, setToggle] = useState(false)

   const handleDrawerToggle = () => {
      setOpenDrawer((prev) => !prev)
      setToggle((prev) => !prev)
   }

   const handleItemClick = (item) => {
      setActiveItem(item)
   }

   const menuItems = [
      {
         text: 'All issues',
         icon:
            activeItem === 'All issues' ? (
               <FilesAndFoldersIcon fill="#FFFFFF" />
            ) : (
               <FilesAndFoldersIcon fill="#3C3C3C" />
            ),
         count: dataLength,
      },
      {
         text: 'Participants',
         icon:
            activeItem === 'Participants' ? (
               <PeopleIcon fill="#FFFFFF" />
            ) : (
               <PeopleIcon fill="3C3C3C" />
            ),
         count: data.partisipants,
      },
      {
         text: 'Settings',
         icon:
            activeItem === 'Settings' ? (
               <ToolsIcon fill="#FFFFFF" />
            ) : (
               <ToolsIcon fill="3C3C3C" />
            ),
      },
   ]
   const menuItemsWorspace = [
      {
         text: 'Board',
         icon: <TemplateIcon fill="#919191" />,
         id: 1,
      },
      {
         text: 'Participants',
         icon: <PeopleIcon fill="#919191" />,
         iconn: <PlusIcon fill="#919191" />,
         id: 2,
      },
      {
         text: 'Settings',
         icon: <ToolsIcon fill="#919191" />,
         id: 3,
      },
   ]
   return (
      <div style={{ display: 'flex' }}>
         <Box sx={{ zIndex: '0' }}>
            <Drawer
               variant="permanent"
               open={openDrawer}
               style={{ position: 'relative', top: '20px' }}
            >
               <SideHead
                  handleItemClick={handleItemClick}
                  handleDrawerToggle={handleDrawerToggle}
                  open={openDrawer}
                  data={data}
                  activeItem={activeItem}
                  menuItems={menuItems}
               />
               <DividerStyle open={openDrawer} />
               <SideMain
                  workspacedata={workspacedata}
                  menuItemsWorspace={menuItemsWorspace}
                  open={openDrawer}
                  activeItem={activeItem}
                  handleItemClick={handleItemClick}
               />
            </Drawer>
         </Box>
         <div style={{ margin: '-1.6rem 0 0 -2.5rem' }}>
            <ListItemIcon
               style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
               }}
            >
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  style={{
                     backgroundColor: '#fff',
                     borderRadius: ' 0rem 0.5rem 0.5rem 0rem',
                     position: 'relative',
                     // top: '2rem',
                     zIndex: '10',
                  }}
               >
                  {toggle ? (
                     <FirstMenu style={{ zIndex: '999999' }} />
                  ) : (
                     <SecondMenu />
                  )}
               </IconButton>
            </ListItemIcon>
         </div>
      </div>
   )
}

const drawerWidth = 250

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
})

const closedMixin = (theme) => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(10.9)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: '5.4rem',
   },
})
const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   backgroundColor: '#f8f8f8a4',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
   }),
}))

const DividerStyle = styled(Divider)(({ open }) => ({
   width: open ? '75%' : '35%',
   marginLeft: '1.8rem',
   borderBottom: '2px solid #E0E0E0',
}))
