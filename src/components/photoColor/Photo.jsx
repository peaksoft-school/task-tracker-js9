import React, { useState } from 'react'
import { styled, IconButton } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'

export const Photos = ({
   boards,
   onLeftIconClick,
   onExitIconClick,
   onPhotoSelect,
}) => {
   const [selectedPhoto, setSelectedPhoto] = useState(null)

   const handlePhotoClick = (photo) => {
      setSelectedPhoto(photo)
      onPhotoSelect(photo)
   }

   return (
      <AllBoard>
         <StyledHeader>
            <IconButton onClick={onLeftIconClick}>
               <LeftIcon />
            </IconButton>
            <p>Photos</p>
            <IconButton onClick={onExitIconClick}>
               <ExitIcon />
            </IconButton>
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
   )
}

const AllBoard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '10px',
   padding: '0 1rem',
   width: '22.9375rem',
   height: '100%',
   borderRadius: '0.625rem',
   marginTop: '1rem',
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
