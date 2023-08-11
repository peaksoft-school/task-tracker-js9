import { styled } from '@mui/material'
// import { useSelector } from 'react-redux'
import { StarIcon } from '../../assets/icons'

export const Board = ({ boards }) => {
   // const { workspaces } = useSelector((state) => state.workspaces)
   // console.log('id:', workspaces)
   return (
      <AllBoard>
         {boards.map((board) => (
            <div key={board.id}>
               <BoardBlock board={board}>
                  <BoardTitle>{board.title}</BoardTitle>
                  <StarContainer>
                     <StarIcon />
                  </StarContainer>
               </BoardBlock>
            </div>
         ))}
      </AllBoard>
   )
}

const AllBoard = styled('div')(() => ({
   width: '100%',
   background: '#F0F0F0;',
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
   padding: '0 1rem',
}))

const BoardBlock = styled('div')(({ board }) => ({
   backgroundColor: `${
      board.background.startsWith('#') ? board.background : ''
   }`,
   backgroundImage: `${
      board.background.startsWith('#') ? 'none' : `url(${board.background})`
   }`,
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',
   width: '16.9375rem',
   height: ' 7.625rem',
   borderRadius: '8px',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px',
}))

const BoardTitle = styled('p')(() => ({
   color: '#FFF',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '500',
}))

const StarContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'end',
}))
