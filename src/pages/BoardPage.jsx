import React from 'react'
// import { styled } from '@mui/material'
import { Sidenav } from '../components/sidebar/Sidenav'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { Board } from '../components/board/Board'

export const BoardPage = () => {
   return (
      <div style={{ display: 'flex' }}>
         <Sidenav
            data={data}
            workspacedata={workspacedata}
            dataLength={dataLength}
         />
         <div>
            <Board />
         </div>
      </div>
   )
}
