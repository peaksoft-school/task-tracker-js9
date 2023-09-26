/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material'
import React, { useState } from 'react'

export const PracticeDragAndDrop = () => {
   const [boards, setBoards] = useState([
      {
         id: 1,
         title: 'sdelat',
         items: [
            { id: 1, title: 'poiti magazin 1' },
            { id: 2, title: 'vykinut musor 1' },
            { id: 3, title: 'oinop keluu 1' },
         ],
      },
      {
         id: 2,
         title: 'sdelan',
         items: [
            { id: 4, title: 'poiti magazin 2' },
            { id: 5, title: 'vykinut musor 2' },
            { id: 6, title: 'oinop keluu 2' },
         ],
      },
      {
         id: 3,
         title: ' ne sdelat',
         items: [
            { id: 7, title: 'poiti magazin 3' },
            { id: 8, title: 'vykinut musor 3' },
            { id: 9, title: 'oinop keluu 3' },
         ],
      },
   ])
   const [currentBoard, setCurrentBoard] = useState(null)
   const [currentItem, setCurrentItem] = useState(null)
   const dragOverHandler = (e) => {
      console.log('dragOverHandler')
      e.preventDefault()
      if (e.target.className === 'item') {
         e.target.style.boxShadow = '0 2px 3px gray'
      }
   }
   const dragleaveHandler = (e) => {
      console.log('dragLeaveHandler')
      e.target.style.boxShadow = 'none'
   }
   const dragStartHandler = (e, board, item) => {
      console.log('dragStartHandler')
      setCurrentBoard(board)
      setCurrentItem(item)
   }
   const dragEndHandler = (e) => {
      console.log('dragEndHandler')
      e.target.style.boxShadow = 'none'
   }
   const dropHandler = (e, board, item) => {
      console.log('dropHandler')
      e.preventDefault()
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      const dropIndex = board.items.indexOf(item)
      board.items.splice(dropIndex + 1, 0, currentItem)
      setBoards(
         boards.map((b) => {
            if (b.id === board.id) {
               return board
            }
            if (b.id === currentBoard.id) {
               return currentBoard
            }
            return b
         })
      )
   }
   const dropCardHandler = (e, board) => {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      setBoards(
         boards.map((b) => {
            if (b.id === board.id) {
               return board
            }
            if (b.id === currentBoard.id) {
               return currentBoard
            }
            return b
         })
      )
   }
   return (
      <div style={{ display: 'flex', marginTop: '9rem', gap: '15px' }}>
         {boards.map((board) => (
            <Board
               className="board"
               onDragOver={(e) => dragOverHandler(e)}
               onDrop={(e) => dropCardHandler(e, board)}
            >
               <BoardTitle>{board.title}</BoardTitle>
               {board.items.map((item) => (
                  <Item
                     onDragOver={(e) => dragOverHandler(e)}
                     onDragLeave={(e) => dragleaveHandler(e)}
                     onDragStart={(e) => dragStartHandler(e, board, item)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDrop={(e) => dropHandler(e, board, item)}
                     draggable={true}
                     className="item"
                  >
                     {item.title}
                  </Item>
               ))}
            </Board>
         ))}
      </div>
   )
}

const Board = styled('div')(() => ({
   width: '300px',
   height: 'auto',
   padding: '10px',
   border: '2px solid red',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   alignItems: 'center',
}))
const BoardTitle = styled('div')(() => ({}))
const Item = styled('div')(() => ({
   width: '250px',
   padding: '10px',
   border: '2px solid green',
}))
