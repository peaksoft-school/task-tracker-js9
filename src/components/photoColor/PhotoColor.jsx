import { styled } from '@mui/material'

export const PhotoColor = ({ boards }) => {
   return (
      <AllBoard>
         {boards.map((board) => (
            <div key={board.id}>
               <BoardBlock background={board.background} />
            </div>
         ))}
      </AllBoard>
   )
}

const AllBoard = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
   padding: '0 1rem',
   width: '22.9375rem',
   height: '26rem',
   borderRadius: '0.625rem',
}))

const BoardBlock = styled('div')((props) => ({
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',
   borderRadius: '0.5rem',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px',
   backgroundColor: props.background,
   width: '10rem',
   height: '5rem',
}))
