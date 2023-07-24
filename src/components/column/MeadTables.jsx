import { styled } from '@mui/system'
import React from 'react'

export const MeadTables = () => {
   return (
      <div>
         <TextActions>Actions</TextActions>
         <CardText>
            <TextAddCard>Add Card</TextAddCard>
         </CardText>
         <Line />
         <CardText>
            <TextDeleteColumn>Delete a column</TextDeleteColumn>
         </CardText>
         <Line />
         <CardText>
            <DeleteAllCards>Delete all cards in this list</DeleteAllCards>
         </CardText>
         <CardText>
            <p>Archive all cards in this list</p>
         </CardText>
         <Line />
         <CardText>
            <p>Archive this column</p>
         </CardText>
      </div>
   )
}

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
   // fontFamily: 'Gilroy',
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

const TextDeleteColumn = styled('p')(() => ({
   // padding: '0.5rem 0rem 1rem 1.25rem',
}))

const DeleteAllCards = styled('p')(() => ({
   // padding: '0.5rem 0rem 1rem 1.25rem',
   // marginBottom: '1rem',
}))
