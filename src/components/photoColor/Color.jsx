import React from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Colors = ({ setPostColor, toggleColor }) => {
   const handlePhotoClick = (photo) => {
      setPostColor(photo)
      toggleColor()
   }

   return (
      <PopoverCont open={toggleColor} onClose={toggleColor}>
         <AllBoard>
            <StyledHeader>
               <StyledIconButton>
                  <StyledLeftIcon />
               </StyledIconButton>
               <p>Colors</p>
               <StyledIconButton>
                  <ExitIcon onClick={toggleColor} />
               </StyledIconButton>
            </StyledHeader>
            <ColorBlocks>
               {boards.map((board) => (
                  <div key={board.id}>
                     <BoardBlock
                        onClick={() => handlePhotoClick(board.background)}
                        board={board}
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
