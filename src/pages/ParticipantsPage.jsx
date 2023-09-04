import React from 'react'
// import { styled } from '@mui/material'
import { Sidenav } from '../components/sidebar/Sidenav'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { Participants } from '../components/participants/Participants'

export const ParticipantsPage = () => {
   return (
      <div style={{ display: 'flex' }}>
         <Sidenav
            data={data}
            workspacedata={workspacedata}
            dataLength={dataLength}
         />
         <div>
            <Participants />
         </div>
      </div>
   )
}
