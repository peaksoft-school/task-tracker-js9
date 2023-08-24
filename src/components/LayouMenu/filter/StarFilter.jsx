import { styled, IconButton } from '@mui/material'
import { StarBlue } from '../../../assets/icons'

export const StarFilter = () => {
   return (
      <div>
         <FilterCont>
            <IconButtonStyled>
               <StarBlue />
            </IconButtonStyled>
         </FilterCont>
      </div>
   )
}

const IconButtonStyled = styled(IconButton)({
   backgroundColor: '#E9E9E9',
})

const FilterCont = styled('div')({
   display: 'flex',
   width: '2.125rem',
   height: '2.125rem',
   padding: '0.375rem 1rem',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
})
