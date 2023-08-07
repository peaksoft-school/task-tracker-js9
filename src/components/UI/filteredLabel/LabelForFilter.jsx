import React from 'react'
import { Checkbox } from '@mui/material'
import { filteredLabels } from '../../../utils/constants/general'

export const LabelForFilter = () => {
   return (
      <div>
         {filteredLabels.map((label) => (
            <div key={label.id}>
               <Checkbox />
               <div>{label.labelColor} </div>
            </div>
         ))}
      </div>
   )
}
