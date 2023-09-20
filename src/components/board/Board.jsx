import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconButton, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { OneStarIcon, StarFilledIcon } from '../../assets/icons'
import {
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
      <BoardWrapper noBoards={boards.length === 0}>
         <AllBoards>
            <BoardButton>
               <Title>All boards</Title>
               <Button onClick={toggleModal}>Create new board</Button>
            </BoardButton>
            {boards.length === 0 ? (
               <NoBoardsMessage>No boards</NoBoardsMessage>
            ) : (
               <Boards>
                  {boards?.map((board) => (
                     <div key={board.boardId}>
                        <BoardBlock board={board}>
                           <BoardTitle
                              onClick={() => boardHandler(board.boardId)}
                           >
                              {board.title}
                           </BoardTitle>
                           <StarContainer>
                              <IconButton>
                                 {board.favorite ? (
                                    <StarFilledIcon
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
                                       fill="#B2B2B2"
                                    />
                                 )}
                              </IconButton>
                           </StarContainer>
                        </BoardBlock>
                     </div>
                  ))}
               </Boards>
            )}
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

const BoardWrapper = styled('div')(({ noBoards }) => ({
   display: 'flex',
   width: noBoards ? '100%' : '100%',
   marginTop: '5rem',
}))

const AllBoards = styled('div')(() => ({
   background: '#F0F0F0;',
   width: '100%',
   height: '89.6vh',
   padding: '0 1rem',
   paddingLeft: '2rem',
}))

const Boards = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   width: '100%',
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
   width: '100%',
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
   cursor: 'pointer',
}))

const BoardButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '25px 0 20px',
}))

const NoBoardsMessage = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100px', // Adjust the height as needed
   fontSize: '1.5rem',
   color: '#777',
}))
