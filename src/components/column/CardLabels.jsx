import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { Label } from './Label'
import { Button } from '../UI/button/Button'
import {
   CheckKeyboardIcon,
   PeopleIcon,
   RealWorldIcon,
   TypographyIcon,
} from '../../assets/icons'
// import { ColumnCard } from './ColumnCard'

export const CardLabels = ({ el }) => {
   console.log('el: ', el)
   const [openLabelText, setOpenLabelText] = useState(false)
   const [clickedLabels, setClickedLabels] = useState([])
   const { participants } = useSelector((state) => state.participant)

   const handleButtonClick = () => {
      setClickedLabels(el.labelResponses)
      setOpenLabelText(true)
   }

   const deleteLabelText = () => {
      setOpenLabelText(false)
   }
   return (
      <div>
         <Labels>
            {openLabelText ? (
               <ParentColorGroupButton>
                  {clickedLabels?.map((el) => (
                     <ColorfulButton
                        onClick={() => deleteLabelText()}
                        key={el.labelId}
                        style={{
                           backgroundColor: el.color,
                        }}
                     >
                        {el.description}
                     </ColorfulButton>
                  ))}
               </ParentColorGroupButton>
            ) : (
               <Labels>
                  {el.labelResponses.map((el) => (
                     <Label
                        key={el.id}
                        onClick={() => handleButtonClick()}
                        color={el.color}
                     />
                  ))}
               </Labels>
            )}
         </Labels>
         <div>
            <ParagraphText>{el.title}</ParagraphText>

            <WraperDedline>
               {el.duration === 'No time set for this card' ? null : (
                  <Deadline>
                     <RealWorldIcon />
                     <ParagraphDeadlineMonth>
                        {el.duration}
                     </ParagraphDeadlineMonth>
                  </Deadline>
               )}
               {el.checkListResponses && el.checkListResponses.length > 0 ? (
                  <CheckListButton backgroundColor="#111" borderRadius="2rem">
                     Cheklist
                  </CheckListButton>
               ) : null}
               {el.numberOfItems && el.numberOfItems > 0 ? (
                  <CheckMarNumberkIcon>
                     <CheckKeyboardIcon />
                     <NumberIcon>{el.numberOfItems}</NumberIcon>
                     <p style={{ color: 'gray' }}>/</p>
                     <NumberIcon>{el.numberOfCompletedItems}</NumberIcon>
                  </CheckMarNumberkIcon>
               ) : null}
               {el.description && <TypographyIcon />}
               <WraperIcons>
                  {participants?.length > 0 ? (
                     <ParentPeopleIcon>
                        <PeopleIcon fill="gray" />
                        <PeopleNumber>{participants?.length}</PeopleNumber>
                     </ParentPeopleIcon>
                  ) : null}
                  <ParentPeopleIcon>
                     <PeopleIcon />
                  </ParentPeopleIcon>
               </WraperIcons>
            </WraperDedline>
         </div>
      </div>
   )
}

const Labels = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '6px',
}))

const ParentColorGroupButton = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '0.3rem',
}))

const ColorfulButton = styled(Button)(() => ({
   padding: '0 0.3rem',
   fontSize: '0.65rem',
   borderRadius: '0.5rem',
   marginBottom: '0.5rem',
   marginRight: '0.5rem',
   '&:active': {
      transform: 'scale(0.9, 0.9)',
   },
}))
const ParagraphText = styled('p')(() => ({
   width: '100%',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
}))

const WraperDedline = styled('div')(() => ({
   display: 'flex',
   marginTop: '1rem',
   justifyContent: 'space-between',
}))

const Deadline = styled('div')(() => ({
   display: 'flex',
   backgroundColor: '#F9DCB4',
   borderRadius: '0.5rem',
   padding: ' 0.125rem 0.5rem 0rem 0.5rem',
   marginRight: '0.75rem',
}))

const WraperIcons = styled('div')(() => ({
   display: 'flex',
   gap: '0.81rem',
}))
const ParagraphDeadlineMonth = styled('p')(() => ({
   fontSize: '0.875rem',
   fontFamily: ' normal',
   fontWeight: 500,
   color: ' #C7852C',
}))
const NumberIcon = styled('p')(() => ({
   color: '#919191',
   fontFamily: 'Cera Pro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '500',
}))
const PeopleNumber = styled('p')(() => ({
   color: '#919191',
   fontFamily: 'Cera Pro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '500',
}))
const CheckMarNumberkIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))
const ParentPeopleIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))

const CheckListButton = styled(Button)(() => ({
   color: '#F8F8F8',
   fontSize: ' 0.45rem',
   fontStyle: ' normal',
   fontWeight: '500',
   top: '5.5rem',
   left: '15rem',
   position: 'absolute',
}))
