import React, { useState } from 'react'
import { styled, Popover, IconButton, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon, MenuIcon } from '../../../assets/icons'
import { MenuItem } from '../../UI/menu/MenuItem'
import { boards } from '../../../utils/constants/general'
import { backgroundImage, backgroundPhoto } from '../../../assets/images'

export const Menu = () => {
   const [open, setOpen] = useState(null)

   const openMenuHandler = () => {
      setOpen('menu')
   }

   const openBackgroundHandler = () => {
      setOpen('background')
   }

   const openPhotosHandler = () => {
      setOpen('photos')
   }

   const openColorsHandler = () => {
      setOpen('colors')
   }

   const closeHandler = () => {
      setOpen('close')
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
         <StlyedContainerMenu onClick={openMenuHandler}>
            <MenuIcon />
            <MenuPargraph>Menu</MenuPargraph>
         </StlyedContainerMenu>

         {open === 'menu' && (
            <MenuItemContainer
               animation="slideIn"
               open={openMenuHandler}
               onClose={openMenuHandler}
            >
               <MenuHeader>
                  <p>{}</p>
                  <p>Menu</p>
                  <ExitIconStyled onClick={closeHandler} />
               </MenuHeader>
               <ChangeDivContainer>
                  <ChangeDiv onClick={openBackgroundHandler}>
                     <ChangeBadkgroundP>
                        Change the background
                     </ChangeBadkgroundP>
                     <ImageStyled
                        src={backgroundPhoto}
                        alt="Background Photo"
                     />
                  </ChangeDiv>

                  <Archive>
                     <ArchiveButton>In archive</ArchiveButton>
                  </Archive>

                  <DeleteBox>
                     <DeleteP>Delete this board</DeleteP>
                  </DeleteBox>
               </ChangeDivContainer>
            </MenuItemContainer>
         )}

         {open === 'background' && (
            <ChangeBackgroundContainer animation="slideIn">
               <ChangeBackgroundHeader>
                  <IconButton onClick={openMenuHandler}>
                     <LeftIcon fill="grey" />
                  </IconButton>
                  <p>Change the background</p>
                  <IconButton>
                     <ExitIcon onClick={closeHandler} />
                  </IconButton>
               </ChangeBackgroundHeader>
               <ImageBox>
                  <ImagePhoto
                     onClick={openPhotosHandler}
                     alt=""
                     src={backgroundPhoto}
                  />
                  <ImagePhoto
                     onClick={openColorsHandler}
                     src={backgroundImage}
                     alt=""
                  />
               </ImageBox>
            </ChangeBackgroundContainer>
         )}

         {open === 'photos' && (
            <PopoverCont open={openPhotosHandler}>
               <AllBoard>
                  <StyledHeader>
                     <StyledIconButton>
                        <StyledLeftIcon onClick={openBackgroundHandler} />
                     </StyledIconButton>
                     <p>Photos</p>
                     <StyledIconButton>
                        <ExitIcon onClick={closeHandler} />
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

         {open === 'colors' && (
            <PopoverContColor open={openColorsHandler}>
               <AllBoardColor>
                  <StyledHeaderColor>
                     <StyledIconButtonColor>
                        <StyledLeftIconColor onClick={openBackgroundHandler} />
                     </StyledIconButtonColor>
                     <p>Colors</p>n
                     <StyledIconButtonColor>
                        <ExitIcon onClick={closeHandler} />
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
const ChangeDivContainer = styled('div')({})
const MenuPargraph = styled('p')({
   color: '#438AB4',
})
const MenuHeader = styled('div')({
   display: 'flex',
   marginBottom: '0.6rem',
   justifyContent: 'space-between',
   marginRight: '0.5rem',
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
const ArchiveButton = styled('p')({
   marginLeft: '1rem',
})

const DeleteP = styled('p')({
   marginLeft: '1rem',
})

const ChangeBadkgroundP = styled('p')({
   marginLeft: '1rem',
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
   transition: 'background-color 0.3s',
   '&:hover': {
      backgroundColor: '#f3f0f0',
   },
})
const ExitIconStyled = styled(ExitIcon)({
   cursor: 'pointer',
})
const MenuItemContainer = styled(MenuItem)({
   width: '22.9375rem',
   height: '28vh',
   borderRadius: '1rem',
   position: 'absolute',
   right: '2rem',
   marginLeft: '1rem',
   padding: '0.5rem 0',
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
      position: 'absolute',
      right: '2rem',
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
const slideInAnimation = keyframes`
   0% {
      transform: translateX(100%);
      opacity: 0;
   }
   100% {
      transform: translateX(0);
      opacity: 1;
   }
`

const PopoverCont = styled(Popover)(() => ({
   position: 'absolute',
   left: '54rem',
   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      minWidth: '23.8rem',
      minHeight: '37rem',
      borderRadius: '0.7rem',
      animation: `${slideInAnimation} 0.3s ease-in-out`,
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
      animation: `${slideInAnimation} 0.3s ease-in-out`,
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
