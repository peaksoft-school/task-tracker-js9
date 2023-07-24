import React, { useState } from 'react'
import { styled } from '@mui/material'
import { MeadIcon } from '../Icon/MeadIcon'
import { ColumnCard } from './ColumnCard'
import { TimerIcon } from '../Icon/TimerIcon'
import { TypographyIcon } from '../Icon/TypographyIcon'
import { CommunicationIcon } from '../Icon/CommunicationIcon'
import { CheckMarkIcon } from '../Icon/CheckMarkIcon'
import { PeopleIcon } from '../Icon/PeopleIcon'
import { ModalUi } from '../UI/modal/Modal'
import { MeadTables } from './MeadTables'
import { Label } from './Label'
import { XIcon } from '../Icon/XIcon'
import { TextArea } from '../UI/textArea/TextArea'
import { Button } from '../UI/button/Button'

const ButtonTextcolors = [
   { color: '#61BD4F', text: 'Сделано' },
   { color: '#EB5A46', text: 'Срочно начать с этого' },
   { color: '#F2D600', text: 'Обратите всем настроение,друзья' },
   { color: '#0079BF', text: 'Хорошего всем настроение,друзья' },
   { color: '#EB5A46', text: 'Срочно начать с этого' },
]

export const CardInColumn = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [openModal, setOpneModal] = useState(false)
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [openModalAddCard, setOpneModalAddCard] = useState(false)

   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [clickedLabels, setClickedLabels] = useState([])
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [inputValue, setInputValue] = useState('')

   const handleOpenModal = () => {
      setOpneModal((state) => !state)
   }

   const handleOpenModalAddCard = () => {
      setOpneModalAddCard((state) => !state)
   }

   const handleButtonClick = () => {
      setClickedLabels(ButtonTextcolors)
   }
   const handleButtonClickAddCard = () => {
      console.log(inputValue)
   }
   const handleAddCardInputChange = (event) => {
      console.log(inputValue)

      setInputValue(event.target.value)
   }

   const handleDeleteButtonDeleteClick = () => {
      setInputValue('')
   }

   return (
      <>
         <ParentTitle>
            <Title>Title</Title>
            <StyleMeadIcon>
               <MeadIcon
                  onClick={(e) => {
                     e.preventDefault()
                     handleOpenModal()
                  }}
               />
            </StyleMeadIcon>
            {openModal && (
               <ModalUi
                  backdropFilter="blur"
                  padding="1rem 0rem 0.5rem"
                  width="16.6875rem"
                  open={openModal}
                  onClose={handleOpenModal}
               >
                  <MeadTables />
               </ModalUi>
            )}
         </ParentTitle>
         <ParentColumnCard>
            <ColumnCard>
               <Labels>
                  {ButtonTextcolors.map((el) => (
                     // eslint-disable-next-line react/no-array-index-key
                     <Label
                        onClick={() => handleButtonClick()}
                        color={el.color}
                     />
                  ))}
               </Labels>
               <ParagraphText>
                  Какая то задача, которую нужно выполнить
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
                  {clickedLabels.map((el) => (
                     <ColorfulButton
                        key={el.text}
                        style={{
                           backgroundColor: el.color,
                        }}
                     >
                        {el.text}
                     </ColorfulButton>
                  ))}
               </ParentColorGroupButton>
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
                     <CheckMarkIcon />
                     <NumberIcon>1/3</NumberIcon>
                  </CheckMarNumberkIcon>
                  <div style={{ display: 'flex', gap: '4px' }}>
                     <PeopleIcon />
                     <PeopleNumber>5</PeopleNumber>
                  </div>
               </FlexIcon>

               <AddPlus onClick={handleOpenModalAddCard}>+ Add a card</AddPlus>

               {openModalAddCard && (
                  <ModalUi
                     onClose={handleOpenModalAddCard}
                     padding="1rem"
                     open={openModalAddCard}
                  >
                     <AddCard>
                        <ParentTitle>
                           <NeedToDo>Need to do</NeedToDo>
                        </ParentTitle>
                        <TextArea
                           type="text"
                           value={inputValue}
                           onChange={handleAddCardInputChange}
                           placeholder="Enter a title for this card"
                        />
                        <ParentButtonAndXIcon>
                           <AddCardButton
                              borderRadius="0.5rem"
                              padding="0.4rem"
                              onClick={handleButtonClickAddCard}
                           >
                              Add card
                           </AddCardButton>
                           <XIcon
                              style={{ marginLeft: '30px' }}
                              onClick={handleDeleteButtonDeleteClick}
                           />
                        </ParentButtonAndXIcon>
                     </AddCard>
                  </ModalUi>
               )}
            </ColumnCard>
         </ParentColumnCard>
      </>
   )
}

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
   cursor: 'pointer',
   backgroundColor: '#f0f0f0',
}))

const ParagraphText = styled('p')(() => ({
   width: '100%',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 400,
   color: '#000',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
}))

const Labels = styled('div')(() => ({
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
}))

const CheckListButton = styled(Button)(() => ({
   color: '#F8F8F8',
   // fontFamily: ' Cera Pro',
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
   cursor: 'pointer',
   color: '#000000',
   fontFamily: ' Cera Pro',
   fontSize: '1rem   ',
   fontStyle: ' normal',
   marginLeft: '0.5rem',
   fontWeight: '400',
}))

const AddCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
}))

const ParentButtonAndXIcon = styled('div')(() => ({
   display: 'flex',
   gap: '1rem',
}))

const NeedToDo = styled('p')(() => ({
   color: '#000',
   fontFamily: ' Gilroy',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: 'normal',
   marginTop: '0.69rem',
}))

const AddCardButton = styled(Button)(() => ({
   color: '#F8F8F8',
   // fontFamily: ' Cera Pro',
   fontSize: ' 0.7rem',
   fontStyle: ' normal',
   fontWeight: '500',
   '&:hover': {
      backgroundColor: '#0079BF',
   },
}))
