import { useState } from 'react'
import { styled, Popover, IconButton, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon, MenuIcon } from '../../../assets/icons'
import { MenuItem } from '../../UI/menu/MenuItem'
import { boards } from '../../../utils/constants/general'

export const Menu = () => {
   const [openMenu, setOpenMenu] = useState(false)
   const [openPhotoColor, setOpenPhotoColor] = useState(false)
   const [openPhotos, setOpenPhotos] = useState(false)
   const [openColors, setOpenColors] = useState(false)
   const openMenuHanlder = () => {
      setOpenMenu((prev) => !prev)
   }
   const openPhotoColorHandler = () => {
      setOpenPhotoColor((prev) => !prev)
   }
   const openPhotosHandler = () => {
      setOpenPhotos((prev) => !prev)
   }
   const openColorsHandler = () => {
      setOpenColors((prev) => !prev)
   }
   const photoBoards = boards.filter(
      (board) =>
         board.background.startsWith('http') ||
         board.background.startsWith('https')
   )
   const colorBoards = boards.filter((board) =>
      board.background.startsWith('#')
   )

   return (
      <div>
         <StlyedContainerMenu onClick={openMenuHanlder}>
            <MenuIcon />
            <MenuPargraph>Menu</MenuPargraph>
         </StlyedContainerMenu>
         {openMenu && (
            <MenuItemContainer
               animation="slideIn"
               open={openMenuHanlder}
               onClose={openMenuHanlder}
            >
               <MenuHeader>
                  <p>{}</p>
                  <p>Menu</p>
                  <ExitIconStyled onClick={openMenuHanlder} />
               </MenuHeader>
               <div>
                  <ChangeDiv onClick={openPhotoColorHandler}>
                     <p>Change the background</p>
                     <ImageStyled
                        src="https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?w=2000"
                        alt=""
                     />
                     {openPhotoColor && (
                        <ChangeBackgroundContainer animation="slideIn">
                           <ChangeBackgroundHeader>
                              <IconButton>
                                 <LeftIcon fill="grey" />
                              </IconButton>
                              <p>Change the background</p>
                              <IconButton>
                                 <ExitIcon onClick={openMenuHanlder} />
                              </IconButton>
                           </ChangeBackgroundHeader>
                           <ImageBox>
                              <ImagePhoto
                                 onClick={openPhotosHandler}
                                 src="https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?w=2000"
                                 alt=""
                              />
                              <ImagePhoto
                                 onClick={openColorsHandler}
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAKlBMVEUAef//3QD/Jgb/lQB4FNQA2igAd///lwD/nABqAN5+AN0A5AD/5wD/AAZPfSoUAAABCklEQVR4nO3QyRGAIAAEMBSRQ+m/XWvYpzNJCSkldfcaGvMKraeljtS7z1R8JUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUvWP7I+GNYPv1eVDTYAAAAASUVORK5CYII="
                                 alt=""
                              />
                           </ImageBox>
                        </ChangeBackgroundContainer>
                     )}
                     {openPhotos && (
                        <PopoverCont open={openPhotosHandler}>
                           <AllBoard>
                              <StyledHeader
                                 style={{
                                    position: 'sticky',
                                    top: 1,
                                    backgroundColor: '#fff',
                                    padding: '0.8rem',
                                 }}
                              >
                                 <StyledIconButton onClick={openPhotosHandler}>
                                    <StyledLeftIcon />
                                 </StyledIconButton>
                                 <p>Photos</p>
                                 <StyledIconButton>
                                    <ExitIcon onClick={openMenuHanlder} />
                                 </StyledIconButton>
                              </StyledHeader>
                              <PhotoBlocks>
                                 {photoBoards.map((board) => (
                                    <div key={board.id}>
                                       <Photos
                                          src={board.background}
                                          alt={`Board ${board.id}`}
                                       />
                                    </div>
                                 ))}
                              </PhotoBlocks>
                           </AllBoard>
                        </PopoverCont>
                     )}
                     {openColors && (
                        <PopoverContColor open={openColorsHandler}>
                           <AllBoardColor>
                              <StyledHeaderColor
                                 style={{
                                    position: 'sticky',
                                    top: 1,
                                    backgroundColor: '#fff',
                                    padding: '0.8rem',
                                 }}
                              >
                                 <StyledIconButtonColor>
                                    <StyledLeftIconColor
                                       onClick={openColorsHandler}
                                    />
                                 </StyledIconButtonColor>
                                 <p>Colors</p>
                                 <StyledIconButtonColor>
                                    <ExitIcon onClick={openMenuHanlder} />
                                 </StyledIconButtonColor>
                              </StyledHeaderColor>
                              <PhotoBlocksColor>
                                 {colorBoards.map((board) => (
                                    <div key={board.id}>
                                       <ColorBlock
                                          style={{
                                             backgroundColor: board.background,
                                          }}
                                          alt={`Board ${board.id}`}
                                       />
                                    </div>
                                 ))}
                              </PhotoBlocksColor>
                           </AllBoardColor>
                        </PopoverContColor>
                     )}
                  </ChangeDiv>
                  <Archive>
                     <p>In archive</p>
                  </Archive>
                  <DeleteBox>
                     <p>Delete this board</p>
                  </DeleteBox>
               </div>
            </MenuItemContainer>
         )}
      </div>
   )
}

const StlyedContainerMenu = styled('div')({
   width: '6rem',
   height: '2.125rem',
   backgroundColor: '#E9E9E9',
   borderRadius: '1.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.3rem',
   cursor: 'pointer',
})

const MenuPargraph = styled('p')({
   color: '#438AB4',
})
const MenuHeader = styled('div')({
   display: 'flex',
   marginBottom: '0.6rem',
   justifyContent: 'space-between',
})
const Archive = styled('div')({
   display: 'flex',
   alignItems: 'center',
   height: '2.625rem',
   '&:hover': {
      backgroundColor: '#f3f0f0',
      cursor: 'pointer',
   },
})

const DeleteBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
   height: '2.625rem',
   '&:hover': {
      backgroundColor: '#f3f0f0',
      cursor: 'pointer',
   },
})
const ChangeDiv = styled('div')({
   display: 'flex',
   alignItems: 'center',
   height: '2.625rem',
   cursor: 'pointer',
   '&:hover': {
      backgroundColor: '#f3f0f0',
   },
})
const ExitIconStyled = styled(ExitIcon)({
   cursor: 'pointer',
})
const MenuItemContainer = styled(MenuItem)({
   width: '22.9375rem',
   height: '30vh',
   borderRadius: '1rem',
   margin: '1rem',
   position: 'absolute',
   right: '2rem',
})
const ImageStyled = styled('img')({
   width: '3.6875rem',
   height: '1.625rem',
   borderRadius: '0.5rem',
   marginLeft: '6rem',
   cursor: 'pointer',
})
const ChangeBackgroundHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
})
const ChangeBackgroundContainer = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }
         break
      case 'fadeIn':
         animationStyles = {
            animation: 'fadeInAnimation 0.3s ease-in-out',
         }
         break
      default:
         break
   }
   return {
      width: '22.9375rem',
      height: '33vh',
      marginTop: '2rem',
      position: 'absolute',
      backgroundColor: '#ffff',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      zIndex: '999',
      ...animationStyles,

      '@keyframes slideInAnimation': {
         '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
         },
         '100%': {
            transform: 'translateX(0)',
            opacity: 1,
         },
      },

      '@keyframes fadeInAnimation': {
         '0%': {
            opacity: 0,
         },
         '100%': {
            opacity: 1,
         },
      },
   }
})
const ImageBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
})
const ImagePhoto = styled('img')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
   cursor: 'pointer',
})
const PopoverCont = styled(Popover)(() => ({
   position: 'absolute',
   left: '54rem',
   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      minWidth: '23.8rem',
      minHeight: '37rem',
      borderRadius: '0.7rem',
   },
}))

const rotateIcon = keyframes`
   from {
     transform: rotate(0);
 
   }
   to {
     transform: rotate(360deg);
   }
 `

const StyledIconButton = styled(IconButton)(() => ({
   padding: '0',
   animation: ` ${rotateIcon} 0.8s linear`,
}))
const StyledLeftIcon = styled(LeftIcon)`
   height: 1.15rem;
   path {
      stroke: #919191;
   }
`
const AllBoard = styled('div')(() => ({
   width: '22.9375rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '10px',
   padding: '0 1rem',
   height: '100%',
   borderRadius: '0.625rem',
   marginTop: '1rem',
   backgroundColor: '#fff',
}))

const StyledHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   padding: '0 1rem',
   marginBottom: '1rem',
})

const PhotoBlocks = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const Photos = styled('img')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
})

const PopoverContColor = styled(Popover)(() => ({
   position: 'absolute',
   left: '54rem',
   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      minWidth: '23.8rem',
      minHeight: '37rem',
      borderRadius: '0.7rem',
   },
}))

const StyledIconButtonColor = styled(IconButton)(() => ({
   padding: '0',
   animation: ` ${rotateIcon} 0.8s linear`,
}))
const StyledLeftIconColor = styled(LeftIcon)`
   height: 1.15rem;
   path {
      stroke: #919191;
   }
`
const AllBoardColor = styled('div')(() => ({
   width: '22.9375rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '10px',
   padding: '0 1rem',
   height: '100%',
   borderRadius: '0.625rem',
   marginTop: '1rem',
   backgroundColor: '#fff',
}))

const StyledHeaderColor = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   padding: '0 1rem',
   marginBottom: '1rem',
})

const PhotoBlocksColor = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const ColorBlock = styled('div')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
   backgroundColor: 'inherit',
})
