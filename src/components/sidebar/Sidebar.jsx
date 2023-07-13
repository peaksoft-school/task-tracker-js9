import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { IconButton } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import {
   TemplateIcon,
   FilesAndFoldersIcon,
   ToolsIcon,
   PeopleIcon,
   GraphicIcon,
   DownIcon,
   PlusIcon,
   ArchiveIcon,
} from '../../assets/icons'

export default function Sidebar() {
   const [state, setState] = React.useState({
      left: true,
   })

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event &&
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return
      }

      setState({ ...state, [anchor]: open })
   }

   const list = (anchor) => (
      <Box
         // sx={{ width: '50%', maxWidth: '100%' }} // Задаем ширину панели
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
      >
         <IconButton
            sx={{ marginLeft: '290px', zIndex: 5 }}
            onClick={toggleDrawer(anchor, true)}
         >
            <ArchiveIcon />
         </IconButton>
         <List>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <TemplateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Board" />
                  <ListItemIcon>
                     <DownIcon />
                  </ListItemIcon>
                  <ListItemIcon>
                     <PlusIcon />
                  </ListItemIcon>
               </ListItemButton>
            </ListItem>
         </List>
         <Divider />
         <List>
            {['All issues', 'Participants', 'Settings'].map((text, index) => {
               let icon
               if (index % 3 === 0) {
                  icon = <FilesAndFoldersIcon />
               } else if (index % 3 === 1) {
                  icon = <PeopleIcon />
               } else {
                  icon = <ToolsIcon />
               }

               return (
                  <ListItem key={text} disablePadding>
                     <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItemButton>
                  </ListItem>
               )
            })}
         </List>
         <Divider />
         <List>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <GraphicIcon />
                  </ListItemIcon>
                  <ListItemText primary="Workspaces" />
                  <ListItemIcon>
                     <PlusIcon />
                  </ListItemIcon>
               </ListItemButton>
            </ListItem>
         </List>
         <Divider />
      </Box>
   )

   return (
      <div>
         {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
               <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                  style={{ position: 'relative' }} // Добавляем стиль позиции
               >
                  {list(anchor)}
               </SwipeableDrawer>
            </React.Fragment>
         ))}
      </div>
   )
}
