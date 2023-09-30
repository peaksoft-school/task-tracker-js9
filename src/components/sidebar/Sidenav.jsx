import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import { IconButton, ListItemIcon } from '@mui/material'
import { SideHead } from './SideHead'
import { SideMain } from './SideMain'

import {
   PeopleIcon,
   PlusIcon,
   TemplateIcon,
   ToolsIcon,
   SecondMenu,
   FirstMenu,
   AllIssuesIcon,
} from '../../assets/icons'
import { fetchBoards } from '../../store/board/boardThunk'
import { fetchAllWorkspaces } from '../../store/workspace/workspaceThunk'

export function Sidenav({ data, dataLength, workspacedata }) {
   const [openDrawer, setOpenDrawer] = useState(false)
   const [activeItem, setActiveItem] = useState(null)
   const [toggle, setToggle] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleDrawerToggle = () => {
      setOpenDrawer((prev) => !prev)
      setToggle((prev) => !prev)
   }

   const handleItemClick = (item) => {
      console.log('item: ', item)
      setActiveItem(item)
   }

   useEffect(() => {
      dispatch(fetchAllWorkspaces())
   }, [dispatch])

   const navigateHandlerToWorkspace = (workSpaceId) => {
      navigate(`/mainPage/${workSpaceId}/boards`)
      dispatch(fetchBoards(workSpaceId))
   }

   const menuItems = [
      {
         text: 'All issues',
         icon:
            activeItem === 'All issues' ? (
               <AllIssuesIcon fill="#FFFFFF" />
            ) : (
               <AllIssuesIcon fill="#919191" />
            ),
         count: dataLength,
      },
      {
         text: 'Participants',
         icon:
            activeItem === 'Participants' ? (
               <PeopleIcon fill="#FFFFFF" />
            ) : (
               <PeopleIcon fill="#919191" />
            ),
         count: data.partisipants,
      },
      {
         text: 'Settings',
         icon:
            activeItem === 'Settings' ? (
               <ToolsIcon fill="#FFFFFF" />
            ) : (
               <ToolsIcon fill="#919191" />
            ),
      },
   ]

   const menuItemsWorspace = [
      {
         text: 'Board',
         icon: (
            <TemplateIcon
               fill="#919191"
               onClick={() => navigateHandlerToWorkspace()}
            />
         ),
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
         <StyledBox sx={{ zIndex: '0', marginTop: '200px' }}>
            <Drawer variant="permanent" open={openDrawer}>
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
                  navigateHandlerToWorkspace={navigateHandlerToWorkspace}
                  open={openDrawer}
                  activeItem={activeItem}
                  handleItemClick={handleItemClick}
               />
            </Drawer>
         </StyledBox>
         <div
            style={{
               position: 'relative',
               left: '-2rem',
               marginRight: '-3.5rem',
            }}
         >
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
                     background:
                        'linear-gradient(to left, #ffffffb6 61%, transparent 61.40%)',
                     borderRadius: '0rem 0.5rem 0.5rem 0rem',
                     position: 'fixed',
                     top: '6rem',
                     // left: '6rem',
                     zIndex: '10',
                  }}
               >
                  {toggle ? (
                     <FirstMenu style={{ zIndex: '99' }} fill="black" />
                  ) : (
                     <SecondMenu fill="black" />
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
   '& .MuiPaper-root': {
      textShadow: '0  0 10px #fff',
   },

   '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
      marginTop: '75px',
      backgroundColor: '#ffffffb6',
      borderRight: '2px solid transparent',
   },
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      width: `calc(${drawerWidth}px - 0.1px)`,
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
   }),
}))

const DividerStyle = styled(Divider)(({ open }) => ({
   width: open ? '75%' : '35%',
   marginLeft: '1.8rem',
   borderBottom: '2px solid #e0e0e0',
}))
const StyledBox = styled(Box)(() => ({
   // backgroundColor: 'red',
}))
