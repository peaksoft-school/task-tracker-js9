import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createNewColumn, getColumns } from '../../store/column/columnsThunk'
import { Columns } from './Columns'
import { NewColumn } from './NewColumn'

export const Column = () => {
   const [isCreatingColumn, setIsCreatingColumn] = useState(false)
   const [newColumnName, setNewColumnName] = useState('')
   const { boardId } = useParams()
   const dispatch = useDispatch()
   const { columnsData } = useSelector((state) => state.columns)

   useEffect(() => {
      dispatch(getColumns(boardId))
   }, [dispatch])

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

   return (
      <ColumnsStyle>
         <Cont>
            {columnsData.map((column) => {
               return (
                  <ChildContainer>
                     <Columns column={column} />
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
   background: 'rgba(145, 145, 145, 0.11)',
}))

const ColumnsStyle = styled('div')(() => ({
   display: 'flex',
   marginTop: '50px',
   maxWidth: '100%',
   backgroundColor: 'white',
   flexDirection: 'reverse',
}))

const Cont = styled('div')({
   overflowX: 'auto',
   maxWidth: '100%',
   display: 'flex',
   gap: '1.5rem',
   height: '75vh',
   margin: '0 20px', // Установка отступа
   padding: '0.7rem ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #D9D9D9 transparent',
   ' &::-webkit-scrollbar ': {
      width: '0.5rem',
   },
   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   ' &::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #D9D9D9',
      borderRadius: '0.25rem',
   },
})

const ChildContainer = styled('div')({
   width: '280px',
})
