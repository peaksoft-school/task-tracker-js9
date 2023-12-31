import React from 'react'
import { Avatar, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import TableMui from '../UI/table/TableMui'

export const AllIssuesTable = ({ selectedUserId, checked }) => {
   console.log('selectedUserId: ', selectedUserId)
   const { allIssues } = useSelector((state) => state.allIssues)
   console.log('allIssues: ', allIssues)
   const filteredIssues = checked
      ? allIssues.filter((issue) => issue.isChecked === checked)
      : allIssues
   const column = [
      {
         heading: 'Created',
         key: 'Created',
         render: (created) => <Created>{created.created}</Created>,
      },
      {
         heading: 'DurationDay',
         key: 'DurationDay',
         render: (durationDay) => <p>{durationDay.durationDay}</p>,
      },
      {
         heading: 'Creator',
         key: 'Creator',
         render: (creatorFullName) => (
            <Creator>{creatorFullName.creatorFullName}</Creator>
         ),
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
               {assignee.length <= 2 ? (
                  assignee.map((item) => {
                     return (
                        <div key={item.userId}>
                           <Avatar key={item.id}>{item.image}</Avatar>
                           <p>{item.fullName}</p>
                        </div>
                     )
                  })
               ) : (
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                     }}
                  >
                     {assignee.assignee.slice(0, 2).map((item) => (
                        <Avatar
                           style={{ marginLeft: '-1rem' }}
                           src={item.image}
                           key={item.id}
                        />
                     ))}
                  </div>
               )}
            </Assignee>
         ),
      },
      {
         heading: 'Labels',
         key: 'Labels',
         render: (label) => (
            <Labels>
               {label.labelResponses.map((item) => (
                  <p key={item.id} style={{ backgroundColor: item.color }} />
               ))}
            </Labels>
         ),
      },
      {
         heading: 'Checklist',
         key: 'Checklist',
         render: (data) => <p>{data.checkListResponse}</p>,
      },
      {
         heading: 'Description',
         key: 'Description',
         align: 'center',
         render: (description) => (
            <Description>{description.description}</Description>
         ),
      },
   ]
   return (
      <div>
         <StyledTable column={column} rows={filteredIssues} />
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
   padding: '0 0 0 2.4rem',
   textAlign: 'left',
   width: '100%',
   maxWidth: '22rem',
}))
const StyledTable = styled(TableMui)(() => ({
   width: '100%',
   '& .css-1q1u3t4-MuiTableRow-root': {
      backgroundColor: 'red',
   },
}))
