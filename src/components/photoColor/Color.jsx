import React from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { DoneIcon, ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Colors = ({ editColor, toggleColor, selectedColor }) => {
   const handlePhotoClick = (photo) => {
      editColor(photo)
   }

   return (
      <PopoverCont open={toggleColor} onClose={toggleColor}>
         <AllBoard>
            <StyledHeader>
               <StyledIconButton>
                  <StyledLeftIcon onClick={toggleColor} />
               </StyledIconButton>
               <p>Colors</p>
               <StyledIconButton onClick={toggleColor}>
                  <ExitIcon fill="gray" />
               </StyledIconButton>
            </StyledHeader>
            <ColorBlocks>
               {boards.map((board) => (
                  <div
                     key={board.id}
                     style={{
                        position: 'relative',
                     }}
                  >
                     <BoardBlock
                        onClick={() => handlePhotoClick(board)}
                        board={board}
                     />
                     {selectedColor === board.id && (
                        <div
                           style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '160px',
                              height: '80px',
                              borderRadius: '8px',
                              background: 'rgba(0,0,0, 0.4)',
                           }}
                        >
                           <Choose
                              fill="#FFFFFF"
                              style={{
                                 position: 'absolute',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: '50px',
                                 height: '50px',
                              }}
                           />
                        </div>
                     )}
                  </div>
               ))}
            </ColorBlocks>
         </AllBoard>
      </PopoverCont>
   )
}

const PopoverCont = styled(Popover)(() => ({
   position: 'relative',
   top: -650,
   left: '62%',

   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      borderRadius: '0.7rem',
      minWidth: '23.8rem',
      minHeight: '27rem',
      overflow: 'hidden',
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
   // height: 1.15rem;
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
   // height: '26rem',
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

const Choose = styled(DoneIcon)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '25px',
   height: '25px',
}))
