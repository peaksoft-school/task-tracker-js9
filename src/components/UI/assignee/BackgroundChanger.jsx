import React, { useState } from 'react'
import { IconButton, Popover, keyframes, styled } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../../assets/icons'
import { Colors } from '../../photoColor/Color'
import { Photos } from '../../photoColor/Photo'

export const BackgroundChanger = ({
   open,
   onClose,
   handleUnassignedClick,
   id,
   anchorEl,
}) => {
   const [isPhotoOpen, setIsPhotoOpen] = useState(false)
   const [isColorOpen, setIsColorOpen] = useState(false)

   const openPhotos = () => {
      setIsPhotoOpen(true)
   }

   const openColors = () => {
      setIsColorOpen(true)
   }

   const handleLeftPhotoClick = () => {
      setIsPhotoOpen(false)
   }
   const handleLeftColorClick = () => {
      setIsColorOpen(false)
   }

   return (
      <>
         <PopoverCont id={id} open={open} onClose={onClose} anchorEl={anchorEl}>
            <BackgroundContainer>
               <StyledIconButton onClick={handleUnassignedClick}>
                  <StyledLeftIcon />
               </StyledIconButton>
               <p>Change the background</p>
               <StyledIconButton onClick={onClose}>
                  <ExitIcon />
               </StyledIconButton>
            </BackgroundContainer>
            <BackgroundChangeContainer>
               <PhotoBackground
                  src="https://i.pinimg.com/564x/8e/58/5d/8e585dc3436016211d20e08fc612e3e4.jpg"
                  alt=""
                  onClick={openPhotos}
               />
               <ColorBackground onClick={openColors} />
            </BackgroundChangeContainer>
         </PopoverCont>
         {isPhotoOpen && (
            <div>
               <Photos
                  handleLeftPhotoClick={handleLeftPhotoClick}
                  id={id}
                  open={open}
                  onClose={onClose}
                  anchorEl={anchorEl}
               />
            </div>
         )}
         {isColorOpen && (
            <div>
               <Colors
                  handleLeftColorClick={handleLeftColorClick}
                  id={id}
                  open={open}
                  onClose={onClose}
                  anchorEl={anchorEl}
               />
            </div>
         )}
      </>
   )
}

const StyledLeftIcon = styled(LeftIcon)`
   height: 1rem;
   margin-top: 3px;
   path {
      stroke: #919191;
   }
`
const BackgroundContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
   padding: '1.4rem 1rem',
}))

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`
const PopoverCont = styled(Popover)(() => ({
   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      minWidth: '23.5rem',
      minHeight: '11.35rem',
      boxShadow: 'none',
      borderRadius: '0.7rem',
      animation: `${slideInFromRight} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
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

const BackgroundChangeContainer = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
   justifyContent: 'center',
}))

const PhotoBackground = styled('img')(() => ({
   width: '10rem',
   borderRadius: '0.5rem',
   border: '1px solid #a5a5a5',
   cursor: 'pointer',
}))

const ColorBackground = styled('div')(() => ({
   width: '10rem',
   height: '5.6rem',
   borderRadius: '0.5rem',
   border: '1px solid #a5a5a5',
   backgroundColor: ' #a5a5a5',
   cursor: 'pointer',
}))
