import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import {
   CheckBoxEmptyIcon,
   CheckBoxFilledIcon,
   RadioFilledIcon,
   RadioEmptyIcon,
   StarFilledIcon,
   StarIcon,
} from '../../assets/icons'

export const RadioComponent = ({ children, variant, iconType, ...props }) => {
   const [radio, setRadio] = useState(false)

   const clickRadioHandler = () => {
      setRadio(!radio)
   }

   const getIcon = () => {
      switch (iconType) {
         case 'checkbox':
            return radio ? <CheckBoxFilledIcon /> : <CheckBoxEmptyIcon />
         case 'radio':
            return radio ? <RadioFilledIcon /> : <RadioEmptyIcon />
         case 'star':
            return radio ? <StarFilledIcon /> : <StarIcon />
         default:
            return null
      }
   }

   return (
      <IconButton onClick={clickRadioHandler} variant={variant} {...props}>
         {getIcon()}
         {children}
      </IconButton>
   )
}
