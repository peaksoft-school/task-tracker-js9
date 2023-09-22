import { styled } from '@mui/material'
import React from 'react'
import { CardLabels } from '../column/CardLabels'
// import { Card } from '../column/Card'

export default function Archivecard({ el }) {
   return (
      <ArchivCard>
         <P>Archived</P>
         <CardLabels el={el} />
      </ArchivCard>
   )
}

const ArchivCard = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   width: '18.5rem',
   padding: '1rem',
})
const P = styled('p')({
   fontSize: '1rem',
   fontWeight: 400,
   textAlign: 'center',
   marginRight: '1.7rem',
   marginBottom: '1rem',
})
