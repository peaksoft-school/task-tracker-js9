import React, { useState } from 'react'
import { styled, IconButton } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'

export const Colors = ({
   boards,
   onColorSelect,
   onLeftIconClick,
   onExitIconClick,
}) => {
   const [selectedColor, setSelectedColor] = useState(null)

   const handleColorClick = (color) => {
      setSelectedColor(color)
      onColorSelect(color)
   }

   return (
      <AllBoard>
         <StyledHeader>
            <IconButton onClick={onLeftIconClick}>
               <LeftIcon />
            </IconButton>
            <p>Colors</p>
            <IconButton>
               <ExitIcon onClick={onExitIconClick} />
            </IconButton>
         </StyledHeader>
         <ColorBlocks>
            {boards.map((board) => (
               <div key={board.id}>
                  <BoardBlock
                     onClick={() => handleColorClick(board.background)}
                     board={board}
                     selected={selectedColor === board.background}
                  />
               </div>
            ))}
         </ColorBlocks>
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
   height: '26rem',
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

const ColorBlocks = styled('div')(() => ({
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
   backgroundColor: board.background,
   width: '10rem',
   height: '5rem',
   border: selected ? '2px solid #000' : 'none',
}))
