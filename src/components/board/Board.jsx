/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconButton, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { OneStarIcon } from '../../assets/icons'
import {
   // boardRemove, ======> Нужен когда удалаем board
   fetchBoards,
   boardPost,
   addFavorite,
} from '../../store/board/boardThunk'
import { BoardModal } from './BoardModal'
import { boards as BoardColors } from '../../utils/constants/general'

export const Board = () => {
   const { id } = useParams()
   const [openModal, setOpenModal] = React.useState(false)
   const boards = useSelector((state) => state.board.board)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   React.useEffect(() => {
      dispatch(fetchBoards(id))
   }, [])
   // const { board } = useSelector((state) => state.board)
   // const boardId = board.map((booard) => booard.id)
   // console.log('boardId:', boardId)

   // const deleteFunc = (boardId) => {
   //    dispatch(boardRemove(boardId))
   //    console.log(boardId)
   // } ======> Нужен когда удалаем board
   const toggleModal = () => {
      setOpenModal((prev) => !prev)
   }

   const postFunc = (objBoard) => {
      dispatch(boardPost({ objBoard, workSpaceId: id }))
   }

   const addFavoriteFonc = (boardId) => {
      dispatch(addFavorite({ boardId, workSpaceId: id }))
   }
   const boardHandler = (id) => {
      navigate(`${id}/board`)
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
                        <BoardTitle onClick={() => boardHandler(board.boardId)}>
                           {board.title}
                        </BoardTitle>
                        <StarContainer>
                           <IconButton>
                              {board.favorite ? (
                                 <OneStarIcon
                                    onClick={() =>
                                       addFavoriteFonc(board.boardId)
                                    }
                                    fill="#0079BF"
                                 />
                              ) : (
                                 <OneStarIcon
                                    onClick={() =>
                                       addFavoriteFonc(board.boardId)
                                    }
                                    fill="inherit"
                                 />
                              )}
                           </IconButton>
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
   width: '100%',
   height: '100vh',
   marginTop: '5rem',
   // minWidth: '90vw',
}))

const AllBoards = styled('div')(() => ({
   background: '#F0F0F0;',
   width: '100%',
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
      board?.backGround?.startsWith('#') ? board?.backGround : ''
   }`,
   backgroundImage: `${
      board?.backGround?.startsWith('#') ? 'none' : `url(${board?.backGround})`
   }`,
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',
   width: '16.9375rem',
   height: '7.625rem',
   borderRadius: '8px',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px',
}))

const BoardTitle = styled('p')(() => ({
   color: '#FFF',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '500',
   cursor: 'pointer',
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
   // width: '130px',
}))
