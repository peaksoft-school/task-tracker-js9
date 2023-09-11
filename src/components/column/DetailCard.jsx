import { styled } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '../UI/button/Button'
import {
   CheckKeyboardIcon,
   CommunicationIcon,
   PeopleIcon,
   RealWorldIcon,
   TypographyIcon,
} from '../../assets/icons'
import { ColumnCard } from './ColumnCard'
import { Label } from './Label'
import { ButtonTextcolors } from '../../utils/constants/buttonTextColor'

export const DetailCard = () => {
   const [openLabelText, setOpenLabelText] = useState(false)
   const [clickedLabels, setClickedLabels] = useState([])

   const handleButtonClick = () => {
      setClickedLabels(ButtonTextcolors)
      setOpenLabelText(true)
   }

   const deleteLabelText = () => {
      setOpenLabelText(false)
   }
   return (
      <div>
         <ColumnCard>
            {openLabelText ? (
               <ParentColorGroupButton>
                  {clickedLabels.map((el) => (
                     <ColorfulButton
                        onClick={() => deleteLabelText()}
                        key={el.id}
                        style={{
                           backgroundColor: el.color,
                        }}
                     >
                        {el.text}
                     </ColorfulButton>
                  ))}
               </ParentColorGroupButton>
            ) : (
               <Labels>
                  {ButtonTextcolors.map((el) => (
                     <Label
                        key={el.id}
                        onClick={() => handleButtonClick()}
                        color={el.color}
                     />
                  ))}
               </Labels>
            )}
            <ParagraphText>
               Какая то задача, которую нужно выполнить
            </ParagraphText>

            <WraperDedline>
               <Deadline>
                  <RealWorldIcon />
                  <ParagraphDeadlineMonth>2 month</ParagraphDeadlineMonth>
               </Deadline>
               <WraperIcons>
                  <TypographyIcon />
                  <CommunicationIcon />
                  <CheckMarNumberkIcon>
                     <CheckKeyboardIcon />
                     <NumberIcon>1/3</NumberIcon>
                  </CheckMarNumberkIcon>
                  <ParentPeopleIcon>
                     <PeopleIcon />
                     <PeopleNumber>5</PeopleNumber>
                  </ParentPeopleIcon>
               </WraperIcons>
            </WraperDedline>
         </ColumnCard>
         <ColumnCard>
            <ParagraphText>
               Какая то задача, которую нужно выполнить
            </ParagraphText>
            <CheckListButton
               backgroundColor="#111"
               borderRadius="2rem"
               padding="0.25rem 0.75rem"
            >
               Cheklist
            </CheckListButton>
            <FlexIcon>
               <CheckMarNumberkIcon>
                  <CheckKeyboardIcon />
                  <NumberIcon>1/3</NumberIcon>
               </CheckMarNumberkIcon>
               <div style={{ display: 'flex', gap: '4px' }}>
                  <PeopleIcon />
                  <PeopleNumber>5</PeopleNumber>
               </div>
            </FlexIcon>
         </ColumnCard>
      </div>
   )
}
const Labels = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '6px',
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
const ParagraphText = styled('p')(() => ({
   width: '100%',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
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

const ParentColorGroupButton = styled('div')(() => ({
   display: 'flex-wrap',
   gap: '0.5rem',
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

const CheckListButton = styled(Button)(() => ({
   color: '#F8F8F8',
   fontSize: ' 0.75rem',
   fontStyle: ' normal',
   fontWeight: '500',
   position: 'absolute',
   marginLeft: '9.5rem',
}))

const FlexIcon = styled('div')(() => ({
   display: 'flex',
   marginTop: '2.44rem',
   justifyContent: 'flex-end',
   gap: '0.5rem',
}))

const CheckMarNumberkIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))
const ParentPeopleIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))
