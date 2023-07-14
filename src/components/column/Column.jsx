import { styled } from '@mui/material'
import React from 'react'
import { MeadIcon } from '../Icon/MeadIcon'
import { ColumnCard } from './ColumnCard'
import { ColumnColorGroup } from './ColumnColorGroup'
import { TimerIcon } from '../Icon/TimerIcon'
import { TypographyIcon } from '../Icon/TypographyIcon'
import { CommunicationIcon } from '../Icon/CommunicationIcon'
import { CheckMarkIcon } from '../Icon/CheckMarkIcon'
import { PeopleIcon } from '../Icon/PeopleIcon'
import { Button } from '../UI/button/Button'

const ButtonTextcolors = [
   { color: 'red', text: 'Сделано' },
   { color: 'green', text: 'Срочно начать с этого' },
   { color: 'blue', text: 'Обратите всем настроение,друзья' },
   { color: 'yellow', text: 'Хорошего всем настроение,друзья' },
   { color: 'blue', text: 'Срочно начать с этого' },
]

export const Column = () => {
   return (
      <ParentColumnStyle>
         <ColumnStyle>
            <ParentTitle>
               <Title>Title</Title>
               <StyleMeadIcon>
                  <MeadIcon />
               </StyleMeadIcon>
            </ParentTitle>
            <ParentColumnCard>
               <ColumnCard>
                  <ParentColorGroup>
                     {ButtonTextcolors.map((el) => (
                        <ColumnColorGroup color={el.color} />
                     ))}
                  </ParentColorGroup>
                  <ParagraphText>
                     <p>Какая то задача, которую нужно выполнить</p>
                  </ParagraphText>

                  <WraperDedline>
                     <Deadline>
                        <TimerIcon />
                        <ParagraphDeadlineMonth>2 month</ParagraphDeadlineMonth>
                     </Deadline>
                     <WraperIcons>
                        <TypographyIcon />
                        <CommunicationIcon />
                        <CheckMarNumberkIcon>
                           <CheckMarkIcon />
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
                  <ParentColorGroupButton>
                     {ButtonTextcolors.map((el) => (
                        <ColorfulButton backgroundColor={el.color}>
                           {el.text}
                        </ColorfulButton>
                     ))}
                  </ParentColorGroupButton>
                  <ParagraphText>
                     <p>Какая то задача, которую нужно выполнить</p>
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
                        <CheckMarkIcon />
                        <NumberIcon>1/3</NumberIcon>
                     </CheckMarNumberkIcon>
                     <div style={{ display: 'flex', gap: '4px' }}>
                        <PeopleIcon />
                        <PeopleNumber>5</PeopleNumber>
                     </div>
                  </FlexIcon>
               </ColumnCard>
               <AddPlus>+ Add a card</AddPlus>
            </ParentColumnCard>
         </ColumnStyle>
      </ParentColumnStyle>
   )
}

const ParentColumnStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '50px',
}))

const ColumnStyle = styled('div')(() => ({
   width: '17.5rem',
   // display: 'flex',
   // justifyContent: 'space-between',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   paddingLeft: '0.5rem',
}))

const ParentTitle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingRight: '0.62rem',
}))

const Title = styled('p')(() => ({
   color: '#000',
   fontFamily: ' Gilroy',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: 'normal',
   marginLeft: '1rem',
   marginTop: '0.69rem',
}))

const ParentColumnCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))

const StyleMeadIcon = styled('div')(() => ({
   marginTop: '0.5rem',
}))

const ParagraphText = styled('div')(() => ({
   fontFamily: ' Gilroy',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 400,
   color: '#000',
}))

const ParentColorGroup = styled('div')(() => ({
   display: 'flex',
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
   padding: ' 0.125rem 0.5rem',
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
   color: '#91919',
   fontFamily: 'Cera Pro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '500',
}))

const PeopleNumber = styled('p')(() => ({
   color: '#91919',
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
}))

const CheckListButton = styled(Button)(() => ({
   color: '#F8F8F8',
   fontFamily: ' Cera Pro',
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

const AddPlus = styled('p')(() => ({
   color: '#000000',
   fontFamily: ' Cera Pro',
   fontSize: '1rem   ',
   fontStyle: ' normal',
   marginLeft: '0.5rem',
   fontWeight: '400',
}))
