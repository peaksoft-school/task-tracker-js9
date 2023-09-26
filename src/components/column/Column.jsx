import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createNewColumn, getColumns } from '../../store/column/columnsThunk'
import { NewColumn } from './NewColumn'
import { fetchParticipans } from '../../store/participants/partThunk'
import { fetchBoards } from '../../store/board/boardThunk'
import { Card } from './Card'
import { moveCard } from '../../store/cards/cardsThunk'
// import { fetchParticipans } from '../../store/participants/partThunk'

export const Column = () => {
   const [isCreatingColumn, setIsCreatingColumn] = useState(false)
   const [newColumnName, setNewColumnName] = useState('')
   const { columnsData } = useSelector((state) => state.columns)
   // const { cardResponses } = useSelector((state) => state.cards)

   const [columns, setColumns] = useState(columnsData)

   const [currentColumn, setCurrentColumn] = useState({})
   const [currentCard, setCurrentCard] = useState({})
   const dispatch = useDispatch()
   const { boardId, id } = useParams()

   const dragOverHandler = (e) => {
      e.preventDefault()
      if (e.target.className === 'item') {
         e.target.style.boxShadow = '0 2px 3px gray'
      }
   }

   const dropCardHandler = (e, column) => {
      e.preventDefault()

      // Получаем данные из dataTransfer
      const cardId = e.dataTransfer.getData('text/plain')

      const data = {
         cardId,
         columnId: column?.columnId,
      }

      dispatch(moveCard({ data, boardId }))
   }

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

   return (
      <ColumnsStyle>
         <Cont>
            {columnsData.map((column) => {
               return (
                  <ChildContainer
                     onDrop={(e) => dropCardHandler(e, column)}
                     onDragOver={(e) => dragOverHandler(e)}
                  >
                     <Card
                        setCurrentColumn={setCurrentColumn}
                        column={column}
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
      width: '0.5rem',
   },
   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   '&::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #D9D9D9',
      borderRadius: '0.25rem',
      width: '0.5rem',
   },
})

const ChildContainer = styled('div')({
   width: '100%',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   height: 'fit-content',
   position: 'relative',
   background: '#E6E6E6',
   cursor: 'pointer',
   '&:active': {
      cursor: 'grabbing',
   },
})
