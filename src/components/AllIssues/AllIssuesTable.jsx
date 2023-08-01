import React from 'react'
import { Avatar } from '@mui/material'
import TableMui from '../UI/table/TableMui'
import { rows } from '../../utils/constants/allIssues'

export const AllIssuesTable = () => {
   const column = [
      {
         heading: 'Created',
         key: 'Created',
         render: (created) => (
            <p style={{ padding: '0 0 0 0.6rem' }}>{created.created}</p>
         ),
      },
      {
         heading: 'Period',
         key: 'Period',
         render: (period) => <p>{period.period}</p>,
      },
      {
         heading: 'Creator',
         key: 'Creator',

         render: (creator) => (
            <p style={{ width: ' 6rem' }}>{creator.creator}</p>
         ),
      },
      {
         heading: 'Column',
         key: 'Column',
         render: (column) => (
            <p style={{ width: '6.25rem' }}>{column.column}</p>
         ),
      },
      {
         heading: 'Assignee',
         key: 'Assignee',
         render: (assignee) => (
            <div style={{ display: 'flex' }}>
               {assignee.assignees.length <= 2 ? (
                  assignee.assignees.map((item) => (
                     <Avatar key={item.id}>{item.img}</Avatar>
                  ))
               ) : (
                  <>
                     {assignee.assignees.slice(0, 2).map((item) => (
                        <Avatar key={item.id}>{item.img}</Avatar>
                     ))}
                     <Avatar>+{assignee.assignees.length - 2}</Avatar>
                  </>
               )}
            </div>
         ),
      },

      {
         heading: 'Labels',
         key: 'Labels',
         render: (label) => (
            <div
               style={{
                  display: 'flex',
                  width: '7rem',
                  height: '1.125rem',
                  gap: '0.2rem',
                  flexWrap: 'wrap',
               }}
            >
               {label.labels.map((item) => (
                  <p
                     style={{
                        backgroundColor: item.color,
                        width: '3.2rem',
                        height: '0.45rem',
                        borderRadius: '0.6rem',
                     }}
                  />
               ))}
            </div>
         ),
      },
      {
         heading: 'Checklist',
         key: 'Checklist',
         render: (data) => (
            <div>
               <p>{data.checklist}</p>
            </div>
         ),
      },
      {
         heading: 'Description',
         key: 'Description',
         align: 'right',
         render: (data) => (
            <p
               style={{
                  padding: '0 0 0 2rem',
                  textAlign: 'left',
                  width: ' 22rem',
               }}
            >
               {data.description}
            </p>
         ),
      },
   ]
   return (
      <div>
         <TableMui column={column} rows={rows} />
      </div>
   )
}
