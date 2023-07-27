import React, { useState } from 'react'
import { styled } from '@mui/material'
import { MeadIcon } from '../Icon/MeadIcon'
import { ColumnCard } from './ColumnCard'
import { TimerIcon } from '../Icon/TimerIcon'
import { TypographyIcon } from '../Icon/TypographyIcon'
import { CommunicationIcon } from '../Icon/CommunicationIcon'
import { CheckMarkIcon } from '../Icon/CheckMarkIcon'
import { PeopleIcon } from '../Icon/PeopleIcon'
import { MeadTables } from './MeadTables'
import { Label } from './Label'
import { Button } from '../UI/button/Button'
import { MenuItem } from '../UI/menu/MenuItem'
import { Input } from '../UI/input/Input'
import { EditIcon, ExitIcon } from '../../assets/icons'

const ButtonTextcolors = [
   {
      color: '#61BD4F',
      text: 'Сделано',
      id: '1',
   },
   {
      color: '#d47859',
      text: 'Срочно начать с этого',
      id: '2',
   },
   {
      color: '#F2D600',
      text: 'Обратите всем настроение,друзья',
      id: '3',
   },
   {
      color: '#0079BF',
      text: 'Хорошего всем настроение,друзья',
      id: '4',
   },
   {
      color: '#EB5A46',
      text: 'Срочно начать с этого',
      id: '5',
   },
]

export const CardInColumn = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [openModal, setOpneModal] = useState(false)
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [selectedLabels, setSelectedLabels] = useState([])
   console.log('selectedLabels: ', selectedLabels)

   const handleOpenModal = () => {
      setOpneModal((state) => !state)
   }
   const handleButtonClick = (text, color, id) => {
      const labelExists = selectedLabels.some((label) => label.color === color)
      if (!labelExists) {
         setSelectedLabels((prevLabels) => [...prevLabels, { text, id, color }])
      }
   }

   const deleteLabelText = (id) => {
      console.log('id: ', id)

      console.log('selectedLabels', selectedLabels)
      console.log('id', id)
      setSelectedLabels(selectedLabels.filter((el) => el.id !== id))
   }

   const [openModalAddCard, setOpneModalAddCard] = useState(false)
   const [openInputAddCard, setOpenInputAddCard] = useState(false)

   const [inputValue, setInputValue] = useState('')
   const [cards, setCards] = useState([])

   const handleOpenModalAddCard = () => {
      setOpneModalAddCard(true)
      setOpenInputAddCard((prev) => !prev)
   }

   const handleButtonClickAddCard = (event) => {
      event.preventDefault()
      const newCard = {
         id: Date.now().toString(),
         text: inputValue,
      }
      setCards((prevTasks) => [...prevTasks, newCard])
      setInputValue('')
   }
   const handleCloseCard = () => {
      setOpenInputAddCard(false)
      setOpneModalAddCard(false)
   }

   const handleAddCardInputChange = (event) => {
      console.log(inputValue)
      setInputValue(event.target.value)
   }

   const isButtonDisabled = inputValue === ''
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
               {openModal && (
                  <MenuItem
                     style={{ marginLeft: '40px' }}
                     padding="1rem 0rem 0.5rem"
                     width="16.6875rem"
                     open={openModal}
                     onClose={handleOpenModal}
                  >
                     <MeadTables />
                  </MenuItem>
               )}
            </StyleMeadIcon>
         </ParentTitle>

         <ParentColumnCard>
            <ColumnCard>
               <Labels>
                  {ButtonTextcolors.map((el) => (
                     // eslint-disable-next-line react/no-array-index-key
                     <Label
                        key={el.id}
                        onClick={() =>
                           handleButtonClick(el.text, el.color, el.id)
                        }
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
                  {selectedLabels.map((el) => (
                     <ColorfulButton
                        onClick={() => deleteLabelText(el.id)}
                        key={el.id}
                        style={{ backgroundColor: el.color }}
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
            </ColumnCard>
            {cards.map((el) => (
               <ColumnCard key={el.id}>
                  <ParagraphText>{el.text}</ParagraphText>
               </ColumnCard>
            ))}
            {openModalAddCard ? (
               <form onSubmit={handleButtonClickAddCard}>
                  <InputAddCard>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        {openInputAddCard && (
                           <InputAddCardStyle
                              // onClose={handleOpenModalAddCard}
                              // padding="1rem"
                              type="text"
                              value={inputValue}
                              open={openModalAddCard}
                              placeholder="Enter a title for this card"
                              onChange={handleAddCardInputChange}
                           />
                        )}
                        {openInputAddCard && <EditIconStyle />}
                     </div>
                     <ParentAddbuttonAndExitIcon>
                        <ButtonAddCardStyle
                           backgroundColor="#0079BF"
                           borderRadius="3px"
                           disabled={isButtonDisabled}
                           onClick={handleButtonClickAddCard}
                           padding="6px 12px"
                        >
                           +Add card
                        </ButtonAddCardStyle>
                        <ExitIconStyle onClick={handleCloseCard} />
                     </ParentAddbuttonAndExitIcon>
                  </InputAddCard>
               </form>
            ) : (
               <AddPlus onClick={handleOpenModalAddCard}>+ Add a card</AddPlus>
            )}
         </ParentColumnCard>
      </>
   )
}

const ParentTitle = styled('div')(() => ({
   display: 'flex',
   // justifyContent: 'space-between',
   marginBottom: '0.89rem',
}))

const Title = styled('p')(() => ({
   color: '#000',
   fontFamily: ' Gilroy',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: 'normal',
   // marginLeft: '1rem',
   // marginTop: '0.69rem',
}))

const ParentColumnCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   // gap: '0.5rem',
}))

const StyleMeadIcon = styled('div')(() => ({
   // marginTop: '0.5rem',
   cursor: 'pointer',
   backgroundColor: '#f0f0f0',
   position: 'absolute',
   marginLeft: '14.62rem',
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
   marginTop: '0.69rem',
}))

const InputAddCardStyle = styled(Input)(() => ({
   input: {
      minHeight: '3.75rem',
      width: '15.2rem',
      backgroundColor: '#F4F4F4',
      borderRadius: '0.25rem',
      padding: '0.5rem 0.63rem',
      border: '0px solid ##919191 ',
   },
}))

const InputAddCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))

const EditIconStyle = styled(EditIcon)(() => ({
   position: 'absolute',
   // marginRight: '500px',
   marginLeft: '14.81rem',
   marginBottom: '2.6rem',
   cursor: 'pointer',
}))

const ParentAddbuttonAndExitIcon = styled('div')(() => ({
   display: 'flex',
   gap: '0.5rem',
}))
const ExitIconStyle = styled(ExitIcon)(() => ({
   color: 'gray',
   cursor: 'pointer',
   marginTop: '0.5rem',
}))

const ButtonAddCardStyle = styled(Button)(() => ({
   '&:disabled': {
      backgroundColor: ' #0079BF',
      color: '#FFFFFF',
   },
}))
