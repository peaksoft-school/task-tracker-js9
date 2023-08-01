import React from 'react'
import { Avatar, styled } from '@mui/material'
import TableMui from '../UI/table/TableMui'
import { rows } from '../../utils/constants/allIssues'

export const AllIssuesTable = () => {
   const column = [
      {
         heading: 'Created',
         key: 'Created',
         render: (created) => <Created>{created.created}</Created>,
      },
      {
         heading: 'Period',
         key: 'Period',
         render: (period) => <p>{period.period}</p>,
      },
      {
         heading: 'Creator',
         key: 'Creator',

         render: (creator) => <Creator>{creator.creator}</Creator>,
      },
      {
         heading: 'Column',
         key: 'Column',
         render: (column) => <Column>{column.column}</Column>,
      },
      {
         heading: 'Assignee',
         key: 'Assignee',
         render: (assignee) => (
            <Assignee>
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
            </Assignee>
         ),
      },

      {
         heading: 'Labels',
         key: 'Labels',
         render: (label) => (
            <Labels>
               {label.labels.map((item) => (
                  <p style={{ backgroundColor: item.color }} />
               ))}
            </Labels>
         ),
      },
      {
         heading: 'Checklist',
         key: 'Checklist',
         render: (data) => <p>{data.checklist}</p>,
      },
      {
         heading: 'Description',
         key: 'Description',
         align: 'right',
         render: (description) => (
            <Description>{description.description}</Description>
         ),
      },
   ]
   return (
      <div>
         <TableMui column={column} rows={rows} />
      </div>
   )
}

const Created = styled('p')(() => ({
   padding: '0 0 0 0.6rem',
}))
const Creator = styled('p')(() => ({
   width: ' 6rem',
}))
const Column = styled('p')(() => ({
   width: '6.25rem',
}))
const Assignee = styled('div')(() => ({
   display: 'flex',
}))

const Labels = styled('div')(() => ({
   display: 'flex',
   width: '7rem',
   height: '1.125rem',
   gap: '0.2rem',
   flexWrap: 'wrap',
   p: {
      width: '3.2rem',
      height: '0.45rem',
      borderRadius: '0.6rem',
   },
}))

const Description = styled('p')(() => ({
   padding: '0 0 0 2rem',
   textAlign: 'left',
   width: ' 22rem',
}))
