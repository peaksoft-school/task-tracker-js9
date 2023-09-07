import { styled } from '@mui/material'
import React from 'react'
import { Card } from '../column/Card'

export default function Archivecard() {
   return (
      <ArchivCard>
         <p>Archived</p>
         <Card title="sd" columnId={3} />
      </ArchivCard>
   )
}

const ArchivCard = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
