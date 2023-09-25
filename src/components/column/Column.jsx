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
   const dispatch = useDispatch()
   const { boardId } = useParams()
   const { columnsData } = useSelector((state) => state.columns)
   console.log('columnsData: ', columnsData)

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
   background: '#E6E6E6',
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
   width: '280px',
})
