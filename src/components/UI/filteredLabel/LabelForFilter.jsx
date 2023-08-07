import React from 'react'
import { Checkbox, styled } from '@mui/material'
import { filteredLabels } from '../../../utils/constants/general'

export const LabelForFilter = () => {
   return (
      <MainLabelContainer>
         <LabelContainer>
            <Checkbox
               sx={{
                  '& .MuiSvgIcon-root': { fontSize: 25 },
                  '&.Mui-checked': {
                     color: ' #4798ca',
                  },
               }}
            />
            <p> no labels</p>
         </LabelContainer>
         {filteredLabels.map((label) => (
            <FilteredLabelContainer key={label.id}>
               <Checkbox
                  sx={{
                     '& .MuiSvgIcon-root': { fontSize: 25 },
                     '&.Mui-checked': {
                        color: ' #3fbd5a',
                     },
                  }}
               />
               <FilteredColorLabelContainer
                  style={{
                     backgroundColor: label.labelColor,
                  }}
               />
            </FilteredLabelContainer>
         ))}
      </MainLabelContainer>
   )
}

const MainLabelContainer = styled('div')(() => ({
   width: ' 21.5rem',
   padding: '1rem 2rem 1rem 0.3rem',
   borderRadius: '0.625rem',
   boxShadow: '-16px 8px 14px 0px rgba(0, 0, 0, 0.03)',
}))

const LabelContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   textTransform: 'capitalize',
   p: {
      fontSize: '1rem',
      fontWeight: 500,
   },
}))
const FilteredLabelContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))
const FilteredColorLabelContainer = styled('div')(() => ({
   width: '14.375rem',
   height: '2rem',
   borderRadius: '0.385rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
}))
