import React from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Photos = ({ setPostColor, togglePhoto }) => {
   const handlePhotoClick = (photo) => {
      setPostColor(photo)
      togglePhoto()
   }

   return (
      <PopoverCont open={togglePhoto} onClose={togglePhoto}>
         <AllBoard>
            <StyledHeader
               style={{
                  position: 'sticky',
                  top: 1,
                  backgroundColor: '#fff',
                  padding: '0.8rem',
               }}
            >
               <StyledIconButton>
                  <StyledLeftIcon />
               </StyledIconButton>
               <p>Photos</p>
               <StyledIconButton onClick={togglePhoto}>
                  <ExitIcon />
               </StyledIconButton>
            </StyledHeader>
            <PhotoBlocks>
               {boards
                  .filter(
                     (boardColor) => boardColor.background.slice(0, 1) !== '#'
                  )
                  .slice(0, 3)
                  .map((boardColor) => (
                     <Img
                        onClick={() => handlePhotoClick(boardColor.background)}
                        board={boardColor}
                        src={boardColor.background}
                        alt=""
                     />
                  ))}
            </PhotoBlocks>
         </AllBoard>
      </PopoverCont>
   )
}

const PopoverCont = styled(Popover)(() => ({
   position: 'relative',
   top: -700,
   left: '50%',
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

const Img = styled('img')(() => ({
   width: '160px',
   height: '72px',
   borderRadius: '8px',
}))
