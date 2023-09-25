import React from 'react'
import { Sidenav } from '../components/sidebar/Sidenav'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { Board } from '../components/board/Board'

export const BoardPage = () => {
   return (
      <div style={{ display: 'flex', width: '100%' }}>
         <Sidenav
            data={data}
            workspacedata={workspacedata}
            dataLength={dataLength}
         />
         <Board />
      </div>
   )
}
