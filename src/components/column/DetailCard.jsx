import { useDispatch } from 'react-redux'
import { styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../UI/button/Button'
import {
   CheckKeyboardIcon,
   CommunicationIcon,
   EditIcon,
   PeopleIcon,
   RealWorldIcon,
   TypographyIcon,
} from '../../assets/icons'
import { ColumnCard } from './ColumnCard'
import { Label } from './Label'
import { InnerCard } from '../innerCard/InnerCard'
import { getCardbyId } from '../../store/cards/cardsThunk'

export const DetailCard = ({ cardResponses }) => {
   const [openLabelText, setOpenLabelText] = useState(false)
   const [, setClickedLabels] = useState([])
   const [showCardById, setShowCardByid] = useState()
   const [openModal, setOpenModal] = useState(false)
   const [cardId, setCardId] = useState(null)
   const { id, boardId } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const getCardByIdHandler = (card) => {
      setCardId(card.cardId)
      navigate(
         `/mainPage/${id}/boards/${boardId}/board/${card.cardId}/innerCard`
      )
      setOpenModal(true)

      dispatch(
         getCardbyId({
            cardId: card.cardId,
         })
      )
   }

   const handleClose = () => {
      setOpenModal(!openModal)
   }

   const handleButtonClick = () => {
      setClickedLabels()
      setOpenLabelText(true)
   }

   const deleteLabelText = () => {
      setOpenLabelText(false)
   }
   console.log('cardResponses', cardResponses)

   return (
      <Cont>
         {cardResponses.map((card) => (
            <ColumnCard key={card.cardId}>
               {openLabelText ? (
                  <ParentColorGroupButton>
                     {card.labelResponses?.map((el) => (
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
                  <Labels style={{ marginLeft: '0.5rem' }}>
                     {card.labelResponses?.map((el) => (
                        <Label
                           key={el.labelId}
                           onClick={() => handleButtonClick()}
                           color={el.color}
                        />
                     ))}
                  </Labels>
               )}

               <ParagraphText>
                  <ColumnCard key={card.cardId}>
                     <IconText>
                        <div>
                           <ParagraphText
                              onClick={() => {
                                 getCardByIdHandler(card)
                                 setShowCardByid(card.cardId)
                              }}
                           >
                              {card.title}
                           </ParagraphText>
                           <EditIconStyle fill="gray" />
                        </div>
                     </IconText>
                  </ColumnCard>
               </ParagraphText>
               {card.checkListResponses &&
               card.checkListResponses.length > 0 ? (
                  <CheckListButton
                     backgroundColor="#111"
                     borderRadius="2rem"
                     padding="0.25rem 0.75rem"
                  >
                     Cheklist
                  </CheckListButton>
               ) : null}

               <WraperDedline>
                  {card.duration && card.duration === '' && (
                     <Deadline>
                        <RealWorldIcon />
                        <ParagraphDeadlineMonth>
                           {card.duration}
                        </ParagraphDeadlineMonth>
                     </Deadline>
                  )}
                  <WraperIcons>
                     {card.commentResponses.map(
                        (el) =>
                           el.comment === '' && (
                              <WraperIcons>
                                 <CommunicationIcon />
                              </WraperIcons>
                           )
                     )}
                     {card.description && card.description === '' && (
                        <TypographyIcon fill="red" />
                     )}
                     {card.numberOfItems && card.numberOfItems > 0 ? (
                        <CheckMarNumberkIcon>
                           <CheckKeyboardIcon />
                           <NumberIcon>{card.numberOfItems}</NumberIcon>
                           <p style={{ color: 'gray' }}>/</p>
                           <NumberIcon>
                              {card.numberOfCompletedItems}
                           </NumberIcon>
                        </CheckMarNumberkIcon>
                     ) : null}
                     {card.numberOfUsers > 1 && (
                        <ParentPeopleIcon>
                           <PeopleIcon fill="gray" />
                           <PeopleNumber>{card.numberOfUsers}</PeopleNumber>
                        </ParentPeopleIcon>
                     )}
                  </WraperIcons>
               </WraperDedline>
               {openModal && (
                  <InnerCard
                     cardId={cardId}
                     cardData={card}
                     handleClose={handleClose}
                     isInnerCardOpen={showCardById === card.cardId}
                  />
               )}
            </ColumnCard>
         ))}
      </Cont>
   )
}
const Cont = styled('div')(() => ({
   position: 'relative',
}))
const ParagraphText = styled('div')(() => ({
   width: '14rem',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
}))
const IconText = styled('div')(() => ({
   display: 'flex',
   position: 'relative',
   marginLeft: '0.5rem',
}))

const EditIconStyle = styled(EditIcon)(() => ({
   position: 'absolute',
   marginLeft: '14rem',
   bottom: '0.0rem',
   cursor: 'pointer',
}))
const Labels = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '6px',
}))

const WraperDedline = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}))

const Deadline = styled('div')(() => ({
   display: 'flex',
   backgroundColor: '#F9DCB4',
   borderRadius: '0.5rem',
   padding: ' 0.125rem 0.5rem 0rem 0.5rem',
   marginLeft: '0.7rem',
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
   // position: 'absolute',
   left: '9.9rem',
   bottom: '0.5rem',
}))

const CheckMarNumberkIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))
const ParentPeopleIcon = styled('div')(() => ({
   display: 'flex',
   gap: '4px',
}))
