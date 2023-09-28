import React from 'react'
import { Sidenav } from '../components/sidebar/Sidenav'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { AllIssues } from '../components/AllIssues/AllIssues'

export const AllIssuesPage = () => {
   return (
      <div style={{ display: 'flex', width: '100%' }}>
         <Sidenav
            data={data}
            workspacedata={workspacedata}
            dataLength={dataLength}
         />
         <AllIssues />
      </div>
   )
}
