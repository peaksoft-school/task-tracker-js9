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
         {columnsData.map((column) => {
            return (
               <div>
                  <Columns column={column} />
               </div>
            )
         })}
      </ColumnsStyle>
   )
}

const CreteColumn = styled('div')(() => ({
   width: '280px',
   height: '2.75rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: '0.5rem',
   background: 'rgba(145, 145, 145, 0.11)',
}))

const ColumnsStyle = styled('div')(() => ({
   display: 'flex',
   gap: '1.5rem',
   marginTop: '50px',
   width: '100%',
   backgroundColor: 'white',
   cursor: 'pointer',
   flexDirection: 'row-reverse',
}))
