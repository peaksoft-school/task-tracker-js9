import { IconButton } from '@mui/material'
import React from 'react'
import { StarIcon } from '../../assets/icons'
import TableMui from '../UI/table/TableMui'

export const WorkspaceTable = () => {
   const column = [
      { heading: '№', key: 'id', index: true },
      {
         heading: 'Nameeeeeeeeeeee',
         key: 'name',
         minWidth: '5rem',
         align: 'left',
      },
      { heading: 'Lied', key: 'lead', minWidth: '9rem' },
      {
         heading: 'Actionnnnnnnnnnnn',
         key: 'action',
         align: 'right',
         render: () => (
            <IconButton>
               {' '}
               <StarIcon fill="#B2B2B2" />
            </IconButton>
         ),
      },
   ]
   const rows = [
      {
         id: 1,
         name: 'Taigan',
         lead: 'Almaz Almazov',
      },
   ]

   return (
      <div>
         <TableMui column={column} rows={rows} />
      </div>
   )
}
