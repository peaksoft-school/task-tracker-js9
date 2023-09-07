import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { Backdrop } from '@mui/material'
import React from 'react'
import {
   addColumnsToArchive,
   deleteColumnById,
} from '../../store/column/columnsThunk'

export const MeadTables = ({ columnId, setOpneModal }) => {
   const dispatch = useDispatch()
   const { boardId } = useParams()

   const deleteColumnHandler = () => {
      dispatch(deleteColumnById({ columnId, boardId }))
      setOpneModal(false)
   }
   const addtoArchiveteHandler = () => {
      const data = {
         columnId,
         boardId,
      }
      dispatch(addColumnsToArchive(data))
      setOpneModal(false)
   }

   return (
      <Container>
         {/* <Backdrop onClick={setOpneModal(false)} /> */}
         <TextActions>Actions</TextActions>
         <CardText>
            <TextAddCard>Add Card</TextAddCard>
         </CardText>
         <Line />
         <CardText>
            <p onClick={deleteColumnHandler}>Delete a column</p>
         </CardText>
         <Line />
         <CardText>
            <p>Delete all cards in this list</p>
         </CardText>
         <CardText>
            <p>Archive all cards in this list</p>
         </CardText>
         <Line />
         <CardText>
            <p onClick={addtoArchiveteHandler}>Archive this column</p>
         </CardText>
      </Container>
   )
}

const Container = styled('div')(() => ({
   padding: '1rem 0rem 0.25rem',
   borderRadius: ' 0.625rem',
   position: 'absolute',
   zIndex: 2,
   backgroundColor: '#FFF',
}))

const TextActions = styled('p')(() => ({
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 400,

   textAlign: 'center',
}))

const CardText = styled('div')(() => ({
   padding: '0.5rem 0rem 0.5rem 1.25rem',
   width: '100%',
   '&:hover': {
      background: '#F2F2F2',
   },
}))

const TextAddCard = styled('p')(() => ({
   color: '#000',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
}))

const Line = styled('div')(() => ({
   background: '#DFE2E7',
   width: '14.1875rem',
   height: ' 0.0625rem',
   marginLeft: '1.25rem',
}))
