import { styled } from '@mui/material'
import { boards } from '../../utils/constants/general'

export const CreateBoard = () => {
   return (
      <AllBoard>
         {boards.map((board) => (
            <div key={board.id}>
               <div
                  style={{
                     backgroundColor: `${board.background}`,
                     width: '16.9375rem',
                     height: ' 7.625rem',
                     borderRadius: '8px',
                  }}
               >
                  <p>{board.title}</p>
               </div>
            </div>
         ))}
      </AllBoard>
   )
}

const AllBoard = styled('div')(() => ({
   width: '100%',
   background: 'gray',
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
   padding: '0 16px',
}))
