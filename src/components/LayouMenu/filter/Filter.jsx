import { useEffect, useState } from 'react'
import { styled, Checkbox, IconButton, keyframes } from '@mui/material'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { ExitIcon, FrameThreeIcon } from '../../../assets/icons'
import { getBoardFilter } from '../../../store/filterBoard/filterBoardThunk'

export const Filter = ({
   openFilterModal,
   openFilterModalHandler,
   closeFilterModalHandler,
}) => {
   const [duration, setDuration] = useState(false)
   const { boardId } = useParams()
   const dispatch = useDispatch()

   const changeDurationHandler = (e) => {
      setDuration(e.target.checked)
   }
   useEffect(() => {
      dispatch(getBoardFilter({ duration, boardId }))
   }, [duration])
   return (
      <div>
         <FilterCont onClick={openFilterModalHandler}>
            <FrameThreeIcon />
            <FilterText>Filter</FilterText>
            <CountNumer>(2)</CountNumer>
         </FilterCont>
         {openFilterModal && (
            <>
               <Backdrop onClick={closeFilterModalHandler} />
               <ModalFilter animation="slideIn">
                  <ModalFilterHeader>
                     <p>{}</p>
                     <p>Filter</p>
                     <IconButton onClick={closeFilterModalHandler}>
                        <ExitIcon fill="gray" />
                     </IconButton>
                  </ModalFilterHeader>
                  <ModalDateBox>
                     <Due>
                        <p>Due date</p>
                     </Due>
                     <CheckbexAndName>
                        <Checkbox
                           checked={duration}
                           onChange={changeDurationHandler}
                        />
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
            </>
         )}
      </div>
   )
}
const Backdrop = styled('div')(() => ({
   width: '100%',
   height: '100%',
   position: 'absolute',
   zIndex: 1,
   top: '0',
   left: '0',
}))
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
const FilterCont = styled('div')({
   width: '7.1875rem',
   height: '2.125rem',
   borderRadius: '1.5rem',
   display: 'flex',
   justifyContent: 'center',
   gap: '0.3rem',
   backgroundColor: '#E9E9E9',
   paddingTop: '0.4rem',
   cursor: 'pointer',
})
const FilterText = styled('p')({
   color: '#438AB4',
})
const CountNumer = styled('p')({
   color: '#438AB4',
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
      height: '40rem',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      gap: '1rem',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      position: 'fixed',
      zIndex: '222',
      right: '3rem',
      top: '5.5rem',
      backgroundColor: 'white',
      ...animationStyles,
   }
})
const ModalFilterHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})
const ModalDateBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
const ModalLabelsBox = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
const CheckbexAndName = styled('div')({
   display: 'flex',
   alignItems: 'center',
})
const LabelsBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
})
const Due = styled('div')({
   marginLeft: '0.4rem',
   color: '#919191',
})
const LabelsText = styled('div')({
   marginLeft: '0.4rem',
   color: '#919191',
})
const DoneText = styled('p')({
   width: '18.3125rem',
   backgroundColor: '#61BD4F',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
   // flex: 10,
})
const AttentionFirst = styled('p')({
   background: '#EB8900',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
   // flex: 10,
})
const AttentionSecond = styled('p')({
   background: '#0079BF',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
   // flex: 10,
})
const AttentionThird = styled('p')({
   background: '#EB5A46',
   width: '18.3125rem',
   padding: '0.375rem 15.8125rem 0.375rem 1rem',
   borderRadius: '0.375rem',
   // flex: 10,
})
