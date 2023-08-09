import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { styled } from '@mui/material'
import { filteredLabels } from '../../../utils/constants/general'

const animatedComponents = makeAnimated()

const SelectContainer = styled(Select)(() => ({
   width: '100%',
}))

export const LabelForFilter = () => {
   const [selectWidth, setSelectWidth] = useState(13)
   const [animating, setAnimating] = useState(false)

   const handleOptionRemove = () => {
      setAnimating(true)
      setSelectWidth(13)
   }

   const handleOptionChange = (selectedOptions) => {
      setAnimating(true)
      if (selectedOptions.length === 0) {
         setSelectWidth(13)
      } else {
         const maxLength = Math.max(
            ...selectedOptions.map((option) => option.label.length)
         )
         const newWidth = Math.min(maxLength * 2.5, 19.5)
         setSelectWidth(newWidth)
      }
   }

   const onAnimationEnd = () => {
      setAnimating(false)
   }

   const colorStyles = {
      control: (styles) => ({
         ...styles,
         backgroundColor: '#fff',
         width: `${selectWidth}rem`,
         cursor: 'pointer',
         transition: animating ? 'width 0.5s' : 'none',
      }),
      menu: (styles) => ({
         ...styles,
         width: `${selectWidth}rem`,
         transition: animating ? 'width 0.5s' : 'none',
      }),
      multiValue: (styles, { data }) => ({
         ...styles,
         backgroundColor: data.value.toLowerCase(),
         borderRadius: '0.3rem',
      }),
      multiValueLabel: (styles) => ({
         ...styles,
         color: 'white',
      }),
      option: (styles, { data, isFocused }) => ({
         ...styles,
         backgroundColor: isFocused
            ? data.value.toLowerCase()
            : styles.backgroundColor,
         cursor: 'pointer',
         color: isFocused ? 'white' : styles.color,
      }),
      multiValueRemove: (styles, { data }) => ({
         ...styles,
         color: data.value.toLowerCase(),
         ':hover': {
            backgroundColor: data.value.toLowerCase(),
            color: 'white',
         },
      }),
   }

   const getOptionLabel = (option) => option.label

   return (
      <SelectContainer
         closeMenuOnSelect={false}
         components={animatedComponents}
         defaultValue={[filteredLabels[4], filteredLabels[5]]}
         isMulti
         options={filteredLabels}
         styles={colorStyles}
         getOptionLabel={getOptionLabel}
         onChange={handleOptionChange}
         onRemove={handleOptionRemove}
         onAnimationEnd={onAnimationEnd}
      />
   )
}
