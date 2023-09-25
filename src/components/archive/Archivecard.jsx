import { styled } from '@mui/material'
import React from 'react'
import { CardLabels } from '../column/CardLabels'
// import { Card } from '../column/Card'

export default function Archivecard({ el }) {
   return (
      <ArchivCard>
         <CardLabels el={el} />
      </ArchivCard>
   )
}

const ArchivCard = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   width: '18.5rem',
   padding: '1rem',
   borderBottom: '1px solid #E3E3E3',
})
