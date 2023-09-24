import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { filteredLabels } from '../../../utils/constants/general'

const animatedComponents = makeAnimated()

const SelectContainer = styled(Select)(() => ({
   width: '100%',

   '& .css-jf55x3-control': {
      borderRadius: '0.5rem',
      height: '2.3rem',
      maxHeight: '0.5rem',
   },
   '& .css-jf55x3-control:active': {
      borderRadius: '0.5rem',
      height: '1rem',
      maxHeight: '0.5rem',
   },
}))

export const LabelForFilter = ({ handleLabelChange }) => {
   const [selectWidth, setSelectWidth] = useState(13)
   const [animating, setAnimating] = useState(false)
   const { allIssues } = useSelector((state) => state.allIssues)
   // const [state, setState] = useState([])

   // useEffect(() => {
   //    const test = allIssues.find((el) => setState({ ...el.labelResponses }))
   //    console.log(test)
   // }, [allIssues])

   // console.log(state)

   const handleOptionRemove = () => {
      setAnimating(true)
      setSelectWidth(13)
   }

   const handleOptionChange = (selectedOptions) => {
      if (selectedOptions.length > 0) {
         handleLabelChange(selectedOptions[0].labelId)
      } else {
         handleLabelChange(null)
      }
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
         backgroundColor: data.value?.toLowerCase(),
         borderRadius: '0.3rem',
      }),
      multiValueLabel: (styles) => ({
         ...styles,
         color: 'white',
      }),
      option: (styles, { data, isFocused }) => ({
         ...styles,
         backgroundColor: isFocused
            ? data.value?.toLowerCase()
            : styles.backgroundColor,
         cursor: 'pointer',
         color: isFocused ? 'white' : styles.color,
      }),
      multiValueRemove: (styles, { data }) => ({
         ...styles,
         color: data.value?.toLowerCase(),
         ':hover': {
            backgroundColor: data.value?.toLowerCase(),
            color: 'white',
         },
      }),
   }

   const getOptionLabel = (option) => option.label

   return (
      <SelectContainer
         // key={labels}
         closeMenuOnSelect={false}
         components={animatedComponents}
         defaultValue={[allIssues[4], allIssues[5]]}
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
