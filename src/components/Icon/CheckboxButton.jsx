import React from 'react'

export const Checkbox = ({ checked, onChange, label }) => {
   return (
      <label>
         <input type="checkbox" checked={checked} onChange={onChange} />
         {label}
      </label>
   )
}
