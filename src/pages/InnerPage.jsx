import React from 'react'
import { Sidenav } from '../components/sidebar/Sidenav'
import { Column } from '../components/column/Column'
import { data, dataLength, workspacedata } from '../utils/constants/general'

export const InnerPage = () => {
   return (
      <div style={{ display: 'flex' }}>
         <Sidenav
            data={data}
            dataLength={dataLength}
            workspacedata={workspacedata}
         />
         <div>
            <Column />
         </div>
      </div>
   )
}
