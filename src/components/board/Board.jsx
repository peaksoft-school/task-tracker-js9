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

const BoardColors = [
   {
      id: '1',
      title: 'Boardname',
      isFavourite: false,
      background:
         'https://cdn.pixabay.com/photo/2013/02/20/11/30/bubbles-83758_640.jpg',
   },
   {
      id: '2',
      title: 'Boardname',
      isFavourite: false,
      background: 'https://petapixel.com/assets/uploads/2022/07/DALLEcopy.jpg',
   },
   {
      id: '3',
      title: 'Boardname',
      isFavourite: false,
      background:
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKHPsvNDJHY9tWpkHrfkfo8Dkf0LvZU3Hdg&usqp=CAU',
   },
   {
      id: '4',
      title: 'Boardname',
      isFavourite: false,
      background: '#CBCBCB',
   },
   {
      id: '5',
      title: 'Boardname',
      isFavourite: false,
      background: '#B04632',
   },
   {
      id: '6',
      title: 'Boardname',
      isFavourite: false,
      background: '#519839',
   },
   {
      id: '7',
      title: 'Boardname',
      isFavourite: false,
      background: '#D29034',
   },
   {
      id: '8',
      title: 'Boardname',
      isFavourite: false,
      background: '#89609E',
   },
   {
      id: '9',
      title: 'Boardname',
      isFavourite: false,
      background: '#005C92',
   },
]

export const Board = () => {
   const [openModal, setOpenModal] = React.useState(false)
   const items = useSelector((state) => state.board.items)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(fetchBoards(items?.workSpaceId))
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
               {items?.map((item) => (
                  <div key={item.boardId}>
                     <BoardBlock items={item}>
                        <BoardTitle>{item.title}</BoardTitle>
                        <StarContainer>
                           <StarIcon />
                        </StarContainer>
                     </BoardBlock>
                  </div>
               ))}
            </Boards>
            {openModal ? (
               <BoardModal
                  BoardColors={BoardColors}
                  {...BoardColors}
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

const BoardBlock = styled('div')(({ items }) => ({
   backgroundColor: `${
      items.backGround.startsWith('#') ? items.backGround : ''
   }`,
   backgroundImage: `${
      items.backGround.startsWith('#') ? 'none' : `url(${items.backGround})`
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
