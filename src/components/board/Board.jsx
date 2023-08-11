import React from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { StarIcon } from '../../assets/icons'
import {
   // boardRemove, ======> Нужен когда удалаем board
   fetchBoards,
   boardPost,
} from '../../store/board/boardThunk'
import { BoardModal } from './BoardModal'
import { BoardColors } from '../../utils/constants/boardsColor'

export const Board = () => {
   const [openModal, setOpenModal] = React.useState(false)
   const boards = useSelector((state) => state.board.board)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(fetchBoards(boards?.workSpaceId))
   }, [])

   // const deleteFunc = (boardId) => {
   //    dispatch(boardRemove(boardId))
   //    console.log(boardId)
   // } ======> Нужен когда удалаем board

   const toggleModal = () => {
      setOpenModal((prev) => !prev)
   }

   const postFunc = (objBoard) => {
      dispatch(boardPost(objBoard))
   }

   return (
      <BoardWrapper>
         <AllBoards>
            <BoardButton>
               <Title>All boards</Title>
               <Button onClick={toggleModal}>Create new board</Button>
            </BoardButton>
            <Boards>
               {boards?.map((board) => (
                  <div key={board.boardId}>
                     <BoardBlock board={board}>
                        <BoardTitle>{board.title}</BoardTitle>
                        <StarContainer>
                           {board.favorire === true ? (
                              <StarIcon fill="#0079BF" />
                           ) : (
                              <StarIcon fill="#B2B2B2" />
                           )}
                        </StarContainer>
                     </BoardBlock>
                  </div>
               ))}
            </Boards>
            {openModal ? (
               <BoardModal
                  BoardColors={BoardColors}
                  postFunc={postFunc}
                  toggleModal={toggleModal}
               />
            ) : null}
         </AllBoards>
      </BoardWrapper>
   )
}

const BoardWrapper = styled('div')(() => ({
   display: 'flex',
}))

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
      board.backGround.startsWith('#') ? board.backGround : ''
   }`,
   backgroundImage: `${
      board.backGround.startsWith('#') ? 'none' : `url(${board.backGround})`
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
