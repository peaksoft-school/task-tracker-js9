import React, { useState } from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Colors = ({
   onColorSelect,
   handleLeftColorClick,
   open,
   onClose,
   id,
   anchorEl,
}) => {
   const [selectedColor, setSelectedColor] = useState(null)

   const handleColorClick = (color) => {
      setSelectedColor(color)
      onColorSelect(color)
   }

   return (
      <PopoverCont id={id} open={open} onClose={onClose} anchorEl={anchorEl}>
         <AllBoard>
            <StyledHeader>
               <StyledIconButton onClick={handleLeftColorClick}>
                  <StyledLeftIcon />
               </StyledIconButton>
               <p>Colors</p>
               <StyledIconButton>
                  <ExitIcon onClick={onClose} />
               </StyledIconButton>
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
      </PopoverCont>
   )
}

const PopoverCont = styled(Popover)(() => ({
   position: 'relative',
   top: -574,
   left: -12,

   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      borderRadius: '0.7rem',
      minWidth: '23.8rem',
      minHeight: '30.8rem',
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
   display: 'flex',
   backgroundColor: '#fff',
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
   padding: '0 0 0 0.3rem',
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
