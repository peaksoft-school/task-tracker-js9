import { IconButton } from '@mui/material'
import React from 'react'
import { StarIcon } from '../../assets/icons'
import TableMui from '../UI/table/TableMui'

export const WorkspaceTable = () => {
   const column = [
      {
         heading: '№',
         key: 'id',
         index: true,
         align: 'right',
      },
      {
         heading: 'Nameeeeeeeeeeee',
         key: 'name',
         minWidth: '5rem',
         align: 'right',
      },
      { heading: 'Lied', key: 'lead', align: 'right' },
      {
         heading: 'Actionnnnnnnnnnnn',
         key: 'action',
         align: 'right',

         render: () => (
            <IconButton>
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
