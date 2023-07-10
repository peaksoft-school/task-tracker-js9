import React from 'react'

export const Radio = ({ checked, onChange, label, value }) => {
   return (
      <label>
         <input
            type="radio"
            checked={checked}
            onChange={onChange}
            value={value}
         />
         {label}
      </label>
   )
}
