import { styled } from '@mui/material'
import { ExitIcon, LeftIcon } from '../../assets/icons'

export const Photos = ({ boards }) => {
   return (
      <AllBoard>
         <StyledHeader>
            <LeftIcon />
            <p>Photos</p>
            <ExitIcon />
         </StyledHeader>
         <ColorBlocks>
            {boards.map((board) => (
               <div key={board.id}>
                  <BoardBlock board={board} />
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

const ColorBlocks = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const BoardBlock = styled('div')(({ board }) => ({
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',
   borderRadius: '0.5rem',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px',
   backgroundImage: `url(${board.background})`,
   width: '10rem',
   height: '5rem',
}))
