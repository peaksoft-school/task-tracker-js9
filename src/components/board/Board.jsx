import React from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
import { StarIcon } from '../../assets/icons'
import {
   boardRemove,
   fetchBoards,
   // setItems,
} from '../../store/slice/boardSlice'

export const Board = () => {
   const dispatch = useDispatch()
   const getPizzas = () => {
      dispatch(fetchBoards())
   }

   React.useEffect(() => {
      getPizzas()
   }, [])

   const items = useSelector((state) => state.boardSlice.items)

   // console.log(items)

   const deleteFunc = (id) => {
      dispatch(boardRemove(id))
   }
   return (
      <AllBoards>
         <BoardButton>
            <Title>All boards</Title>
            <Button>Create new board</Button>
         </BoardButton>
         <Boards>
            {items.map((item) => (
               <div key={item.id}>
                  <BoardBlock board={item}>
                     <BoardTitle>{item.title}</BoardTitle>
                     <StarContainer>
                        <StarIcon onClick={() => deleteFunc(item.id)} />
                     </StarContainer>
                  </BoardBlock>
               </div>
            ))}
         </Boards>
      </AllBoards>
   )
}

const AllBoards = styled('div')(() => ({
   background: '#F0F0F0;',
   width: '1146px',
   margin: ' 0 auto',
   height: '100vh',
   padding: '0 1rem',
}))

const Boards = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
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

const Title = styled('h3')(() => ({}))

const Button = styled('button')(() => ({
   padding: '8px 16px',
   borderRadius: '24px',
   border: 'none',
   backgroundColor: '#0079BF',
   color: '#fff',
   fontSize: '0.9rem',
}))

const BoardButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '25px 0 20px',
}))
