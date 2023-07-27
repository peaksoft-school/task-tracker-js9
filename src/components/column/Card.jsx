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
import { Button } from '../UI/button/Button'
import { MenuItem } from '../UI/menu/MenuItem'
import { EditIcon, ExitIcon } from '../../assets/icons'
import { ButtonTextcolors } from '../../utils/constants/buttonTextColor'
import { Label } from './Label'

export const CardInColumn = () => {
   const [openModal, setOpneModal] = useState(false)
   const [openLabelText, setOpenLabelText] = useState(false)
   const [clickedLabels, setClickedLabels] = useState([])

   const handleOpenModal = () => {
      setOpneModal((state) => !state)
   }
   const handleButtonClick = () => {
      setClickedLabels(ButtonTextcolors)
      setOpenLabelText(true)
   }

   const deleteLabelText = () => {
      setOpenLabelText(false)
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
                  <MenuItemStyle
                     width="16.6875rem"
                     open={openModal}
                     onClose={handleOpenModal}
                  >
                     <MeadTables />
                  </MenuItemStyle>
               )}
            </StyleMeadIcon>
         </ParentTitle>

         <ParentColumnCard>
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
                  <IconText>
                     <ParagraphText>{el.text}</ParagraphText>
                     <EditIconStyle />
                  </IconText>
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
const MenuItemStyle = styled(MenuItem)(() => ({
   padding: '1rem 0rem 0.25rem',
   borderRadius: ' 0.625rem',
   backgroundColor: '#FFF',
   boxShadow: '  -12px 1px 36px 0px rgba(34, 60, 80, 0.2)',
   marginRight: '-40px',
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

// const Label = styled(Button)(() => ({
//    width: '2.8125rem',
//    height: ' 0.3125rem',
// }))

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
const IconText = styled('div')(() => ({
   display: 'flex',
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

const EditIconStyle = styled(EditIcon)(() => ({
   position: 'absolute',
   // marginRight: '500px',
   marginLeft: '14.31rem',
   marginBottom: '5.6rem',
   cursor: 'pointer',
}))
const InputAddCardStyle = styled('textarea')(() => ({
   minHeight: '3.75rem',
   width: '16.5rem',
   backgroundColor: '#F4F4F4',
   borderRadius: '0.25rem',
   padding: '8px 8px 4px 12px',
   resize: 'none',
   overflow: 'hidden',
   // border: 'none',
}))

const InputAddCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
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
