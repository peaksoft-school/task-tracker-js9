import React, { useState } from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Photos = ({
   onPhotoSelect,
   open,
   onClose,
   id,
   handleLeftPhotoClick,
   anchorEl,
}) => {
   const [selectedPhoto, setSelectedPhoto] = useState(null)

   const handlePhotoClick = (photo) => {
      setSelectedPhoto(photo)
      onPhotoSelect(photo)
   }

   return (
      <PopoverCont id={id} open={open} onClose={onClose} anchorEl={anchorEl}>
         <AllBoard>
            <StyledHeader
               style={{
                  position: 'sticky',
                  top: 1,
                  backgroundColor: '#fff',
                  padding: '0.8rem',
               }}
            >
               <StyledIconButton onClick={handleLeftPhotoClick}>
                  <StyledLeftIcon />
               </StyledIconButton>
               <p>Photos</p>
               <StyledIconButton onClick={onClose}>
                  <ExitIcon />
               </StyledIconButton>
            </StyledHeader>
            <PhotoBlocks>
               {boards.map((board) => (
                  <div key={board.id}>
                     <BoardBlock
                        onClick={() => handlePhotoClick(board.background)}
                        board={board}
                        selected={selectedPhoto === board.background}
                     >
                        <img src={board.background} alt={board.id} />
                     </BoardBlock>
                  </div>
               ))}
            </PhotoBlocks>
         </AllBoard>
      </PopoverCont>
   )
}

const PopoverCont = styled(Popover)(() => ({
   position: 'relative',
   top: -574,
   left: -12,

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

const BoardBlock = styled('div')(({ board, selected }) => ({
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',
   borderRadius: '0.5rem',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px',
   backgroundImage: `url(${board.background})`,
   width: '10rem',
   height: '5rem',
   border: selected ? '2px solid #000' : 'none',
}))
