import React from 'react'
import { styled, IconButton, Popover, keyframes } from '@mui/material'
import { DoneIcon, ExitIcon, LeftIcon } from '../../assets/icons'
import { boards } from '../../utils/constants/general'

export const Photos = ({ editPhoto, togglePhoto, selectedPhoto }) => {
   const handlePhotoClick = (photo) => {
      editPhoto(photo)
   }

   return (
      <PopoverCont open={togglePhoto} onClose={togglePhoto}>
         <AllBoard>
            <StyledHeader
               style={{
                  position: 'sticky',
                  top: 1,
                  backgroundColor: '#fff',
                  padding: '0.8rem 0',
               }}
            >
               <StyledIconButton>
                  <StyledLeftIcon onClick={togglePhoto} />
               </StyledIconButton>
               <p>Photos</p>
               <StyledIconButton onClick={togglePhoto}>
                  <ExitIcon fill="gray" />
               </StyledIconButton>
            </StyledHeader>
            <PhotoBlocks>
               {boards
                  .filter(
                     (boardColor) => boardColor.background.slice(0, 1) !== '#'
                  )
                  .map((boardColor) => (
                     <div
                        style={{
                           position: 'relative',
                        }}
                     >
                        <Img
                           onClick={() => handlePhotoClick(boardColor)}
                           board={boardColor}
                           src={boardColor.background}
                           alt=""
                        />
                        {selectedPhoto === boardColor.id && (
                           <div
                              style={{
                                 position: 'absolute',
                                 top: '46%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: '162px',
                                 height: '72px',
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
                                    width: '45px',
                                    height: '45px',
                                 }}
                              />
                           </div>
                        )}
                     </div>
                  ))}
            </PhotoBlocks>
         </AllBoard>
      </PopoverCont>
   )
}

const PopoverCont = styled(Popover)(() => ({
   position: 'relative',
   top: -650,
   left: '62%',

   '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
      minWidth: '23.8rem',
      minHeight: '36rem',
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
   paddingLeft: '1.4rem',
   height: '100%',
   borderRadius: '0.625rem',
   backgroundColor: '#fff',
}))

const StyledHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   // padding: '0 1rem',
})

const PhotoBlocks = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const Img = styled('img')(() => ({
   width: '162px',
   height: '72px',
   borderRadius: '8px',
}))

const Choose = styled(DoneIcon)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '25px',
   height: '25px',
}))
