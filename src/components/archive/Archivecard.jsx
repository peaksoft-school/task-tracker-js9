import { styled } from '@mui/material'
import React from 'react'
import { DetailCard } from '../column/DetailCard'
// import { Card } from '../column/Card'

export default function Archivecard() {
   return (
      <ArchivCard>
         <P>Archived</P>
         <DetailCard />
      </ArchivCard>
   )
}

const ArchivCard = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   width: '18.5rem',
})
const P = styled('p')({
   fontSize: '1rem',
   fontWeight: 400,
   textAlign: 'center',
   marginRight: '1.7rem',
})
