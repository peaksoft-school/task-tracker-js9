import { useState } from 'react'
import { styled, Checkbox, IconButton, keyframes } from '@mui/material'
import { ExitIcon, StarBlue } from '../../../assets/icons'

export const StarFilter = () => {
   const [openFilterModal, setOpenFilterModal] = useState(false)

   const openFilterModalHandler = () => {
      setOpenFilterModal((prev) => !prev)
   }
   const closeFilterModalHandler = () => {
      setOpenFilterModal(false)
   }

   return (
      <div>
         <FilterCont onClick={openFilterModalHandler}>
            <IconButtonStyled>
               <StarBlue />
            </IconButtonStyled>
         </FilterCont>
         {openFilterModal && (
            <ModalFilter animation="slideIn">
               <ModalFilterHeader>
                  <p>Filter</p>
                  <IconButton>
                     <ExitIcon onClick={closeFilterModalHandler} />
                  </IconButton>
               </ModalFilterHeader>
               <ModalDateBox>
                  <Due>
                     <p>Due date</p>
                  </Due>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>No Dates</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Overdue</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Due in the next day</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Due in the next week</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Due in the next month</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Marked as complete</p>
                  </CheckbexAndName>
                  <CheckbexAndName>
                     <Checkbox />
                     <p>Not marked as complete</p>
                  </CheckbexAndName>
               </ModalDateBox>
               <ModalLabelsBox>
                  <LabelsText>
                     <p>labels</p>
                  </LabelsText>
                  <LabelsBox>
                     <Checkbox />
                     <p>No labels</p>
                  </LabelsBox>
                  <LabelsBox>
                     <Checkbox />
                     <DoneText>Done</DoneText>
                  </LabelsBox>
                  <LabelsBox>
                     <Checkbox />
                     <AttentionFirst>Attention</AttentionFirst>
                  </LabelsBox>
                  <LabelsBox>
                     <Checkbox />
                     <AttentionSecond>Attention</AttentionSecond>
                  </LabelsBox>
                  <LabelsBox>
                     <Checkbox />
                     <AttentionThird>Attention</AttentionThird>
                  </LabelsBox>
               </ModalLabelsBox>
            </ModalFilter>
         )}
      </div>
   )
}

const slideInAnimation = keyframes`
   from {
      transform: translateX(100%);
      opacity: 0;
   }
   to {
      transform: translateX(0);
      opacity: 1;
   }
`

const DoneText = styled('p')({
   width: '18.3125rem',
   backgroundColor: '#61BD4F',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
})

const ModalDateBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
const IconButtonStyled = styled(IconButton)({
   backgroundColor: '#E9E9E9',
})

const Due = styled('div')({
   marginLeft: '0.4rem',
   color: '#919191',
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
const AttentionFirst = styled('p')({
   background: '#EB8900',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
})

const AttentionSecond = styled('p')({
   background: '#0079BF',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
})

const AttentionThird = styled('p')({
   background: '#EB5A46',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
})
const LabelsText = styled('div')({
   marginLeft: '0.4rem',
   color: '#919191',
})

const LabelsBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
})
const ModalFilter = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: `${slideInAnimation} 0.3s ease-in-out`,
         }
         break
      default:
         break
   }

   return {
      width: '22.9375rem',
      height: '38.5rem',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      gap: '1rem',
      borderRadius: '0.5rem',
      position: 'absolute',
      right: '5rem',
      backgroundColor: 'white',
      ...animationStyles,
   }
})

const ModalLabelsBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
const ModalFilterHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})
const CheckbexAndName = styled('div')({
   display: 'flex',
   alignItems: 'center',
})
