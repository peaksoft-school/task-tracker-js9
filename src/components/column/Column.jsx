import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createNewColumn, getColumns } from '../../store/column/columnsThunk'
import { Card } from './Card'

import { NewColumn } from './NewColumn'
import { fetchParticipans } from '../../store/participants/partThunk'
import { fetchBoards } from '../../store/board/boardThunk'
import { moveCard } from '../../store/card/cardThunk'

export const Column = () => {
   const [isCreatingColumn, setIsCreatingColumn] = useState(false)
   const [newColumnName, setNewColumnName] = useState('')
   const dispatch = useDispatch()
   const { boardId, id } = useParams()
   const { columnsData } = useSelector((state) => state.columns)
   const [hoveredColumnId, setHoveredColumnId] = useState(null)

   const [columns, setColumns] = useState(columnsData)

   const [currentColumn, setCurrentColumn] = useState({})
   const [currentCard, setCurrentCard] = useState({})

   useEffect(() => {
      dispatch(getColumns(boardId))
   }, [dispatch])

   useEffect(() => {
      dispatch(fetchBoards(id))
   }, [])

   const role = 'ALL'

   useEffect(() => {
      dispatch(fetchParticipans({ id, role }))
   }, [])

   const handleAddColumnClick = () => {
      setIsCreatingColumn(!isCreatingColumn)
   }
   const handleInputChange = (e) => {
      const newValue = e.target.value
      setNewColumnName(newValue)
   }

   const handleCreateColumnClick = () => {
      const newdata = {
         title: newColumnName,
         boardId: +boardId,
      }
      dispatch(createNewColumn({ newdata, boardId }))
      setIsCreatingColumn(false)
      setNewColumnName('')
   }
   const dragOverHandler = (e) => {
      e.preventDefault()
   }
   const dropCardHandler = (e, column) => {
      e.preventDefault()
      setHoveredColumnId(null)

      // Получаем данные из dataTransfer
      const cardId = e.dataTransfer.getData('text/plain')

      const data = {
         cardId,
         columnId: column?.columnId,
      }

      dispatch(moveCard({ data, boardId }))
   }

   const dropHandler = (e, column) => {
      e.preventDefault()

      // Получаем данные из dataTransfer
      const cardId = e.dataTransfer.getData('text/plain')

      const data = {
         cardId,
         columnId: column?.columnId,
      }

      dispatch(moveCard({ data, boardId }))
   }

   const handleDragLeave = (column) => {
      setHoveredColumnId(column.columnId)
   }

   return (
      <ColumnsStyle>
         <Cont>
            {columnsData.map((column) => {
               return (
                  <ChildContainer
                     onDrop={(e) => dropCardHandler(e, column)}
                     onDragOver={(e) => dragOverHandler(e)}
                     onDragLeave={() => handleDragLeave(column)}
                     isHovered={hoveredColumnId === column.columnId}
                  >
                     <Card
                        column={column}
                        setCurrentColumn={setCurrentColumn}
                        setCurrentCard={setCurrentCard}
                        setColumns={setColumns}
                        currentCard={currentCard}
                        currentColumn={currentColumn}
                        columns={columns}
                        dropHandler={dropHandler}
                     />
                  </ChildContainer>
               )
            })}
            {isCreatingColumn ? (
               <NewColumn
                  handleCreateColumnClick={handleCreateColumnClick}
                  handleInputChange={handleInputChange}
                  handleAddColumnClick={handleAddColumnClick}
                  newColumnName={newColumnName}
               />
            ) : (
               <CreteColumn onClick={handleAddColumnClick}>
                  + Add a column
               </CreteColumn>
            )}
         </Cont>
      </ColumnsStyle>
   )
}

const CreteColumn = styled('div')(() => ({
   minWidth: '280px',
   height: '2.75rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: '0.5rem',
   background: '#E6E6E6',
   cursor: 'pointer',
}))

const ColumnsStyle = styled('div')(() => ({
   display: 'flex',
   marginTop: '10px',
   maxWidth: '100%',
   flexDirection: 'reverse',
}))

const Cont = styled('div')({
   overflowX: 'auto',
   maxWidth: '100%',
   display: 'flex',
   gap: '3rem',
   height: '78vh',
   margin: '0 20px 50px 0 ',
   padding: '0.7rem ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #b3b3b3 transparent',
   '&::-webkit-scrollbar ': {
      width: '0.1rem',
   },
   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   '&::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #D9D9D9',
      borderRadius: '0.25rem',
      width: '0.1rem',
   },
})
const ChildContainer = styled('div')(({ isHovered }) => ({
   width: '100%',
   borderRadius: '0.5rem',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   height: 'fit-content',
   position: 'relative',
   cursor: 'pointer',
   transition: 'background 0.1s ease, box-shadow 0.3s ease-in-out',
   background: isHovered ? '#bdb6b6' : '#E6E6E6',

   boxShadow: isHovered
      ? '0 0 10px rgba(57, 53, 53, 0.8), 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset'
      : 'none',
   '&:hover': {
      boxShadow:
         '0 0 10px rgba(0, 0, 0, 0.8), 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset',
   },
}))
