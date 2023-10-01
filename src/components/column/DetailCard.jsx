/* eslint-disable no-undef */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
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
import { Label } from './Label'
import { InnerCard } from '../innerCard/InnerCard'
import { getCardbyId } from '../../store/cards/cardsThunk'
import { getColumns } from '../../store/column/columnsThunk'
import { getMembersInCard } from '../../store/inviteMember/inviteThunk'

export const DetailCard = ({
   cardResponses,
   setCurrentColumn,
   setCurrentCard,
   column,
   dropHandler,
}) => {
   const [openLabelMap, setOpenLabelMap] = useState({})
   const [showCardById, setShowCardByid] = useState()
   const [openModal, setOpenModal] = useState(false)
   const [cardId, setCardId] = useState(null)
   const { id, boardId } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { participants } = useSelector((state) => state.participant)

   const toggleCardLabel = (cardId) => {
      setOpenLabelMap((prevOpenLabelMap) => ({
         ...prevOpenLabelMap,
         [cardId]: !prevOpenLabelMap[cardId],
      }))
   }

   const getCardByIdHandler = (card) => {
      setCardId(card.cardId)
      navigate(
         `/mainPage/${id}/boards/${boardId}/board/${card.cardId}/innerCard`
      )
      setOpenModal(true)
      dispatch(getMembersInCard({ cardId: card.cardId }))
      console.log('first ', { cardId: card.cardId })
      dispatch(
         getCardbyId({
            cardId: card.cardId,
         })
      )
   }

   const handleClose = () => {
      setOpenModal(!openModal)
      dispatch(getColumns(boardId))
   }
   const deleteLabelText = () => {
      setOpenLabelMap({})
   }
   const dragOverHandler = (e) => {
      e.preventDefault()
   }
   const dragStartHandler = (e, column, card) => {
      setCurrentColumn(column)
      setCurrentCard(card?.cardId)
      setCardId(card.cardId)

      e.dataTransfer.setData('text/plain', card.cardId)
   }
   const dragEndHandler = (e) => {
      e.target.style.boxShadow = 'none'
   }

   return (
      <Cont>
         {cardResponses?.map((card) => (
            <ColumnCard
               key={card.cardId}
               onDragOver={(e) => dragOverHandler(e)}
               onDragStart={(e) => dragStartHandler(e, column, card)}
               onDragEnd={(e) => dragEndHandler(e)}
               onDrop={(e) => dropHandler(e, column, card)}
               // eslint-disable-next-line react/jsx-boolean-value
               draggable={true}
            >
               {card.attachmentResponses?.[0]?.documentLink ? (
                  <AttachmentCard
                     onClick={() => {
                        getCardByIdHandler(card)
                        setShowCardByid(card.cardId)
                     }}
                  >
                     <img
                        style={{
                           width: '98%',
                           height: '7rem',
                           objectFit: 'cover',
                           marginLeft: '5px',
                           borderRadius: '0.25rem',
                        }}
                        src={card.attachmentResponses[0].documentLink}
                        alt=""
                     />
                  </AttachmentCard>
               ) : null}

               {openLabelMap[card.cardId] ? (
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
                           onClick={() => toggleCardLabel(card.cardId)}
                           color={el.color}
                        />
                     ))}
                  </Labels>
               )}

               <ParagraphText>
                  <ColumnCard key={card.cardId}>
                     <IconText
                        onClick={() => {
                           getCardByIdHandler(card)
                           setShowCardByid(card.cardId)
                        }}
                     >
                        <div>
                           <ParagraphText>{card.title}f</ParagraphText>
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
                  {card?.duration && (
                     <Deadline>
                        <RealWorldIcon />
                        <ParagraphDeadlineMonth>
                           {card.duration}
                        </ParagraphDeadlineMonth>
                     </Deadline>
                  )}
                  <WraperIcons>
                     {card.commentResponses?.map(
                        (el) =>
                           el.comment === '' && (
                              <WraperIcons>
                                 <CommunicationIcon />
                              </WraperIcons>
                           )
                     )}
                     {card.description && <TypographyIcon />}
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
                     {participants?.length > 0 ? (
                        <ParentPeopleIcon>
                           <PeopleIcon fill="gray" />
                           <PeopleNumber>{participants?.length}</PeopleNumber>
                        </ParentPeopleIcon>
                     ) : null}
                  </WraperIcons>
               </WraperDedline>
               {openModal && (
                  <InnerCard
                     setOpenModal={setOpenModal}
                     displayTitle={card.title}
                     displayText={card.description}
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
const AttachmentCard = styled('div')(() => ({
   width: '100%',
   height: '7rem',
}))
const ColumnCard = styled('div')(() => ({
   width: '16.8rem',
   background: '#ffffff',
   marginBottom: '1rem',
   borderRadius: ' 0.25rem',
   paddingRight: '0.4rem',
   paddingTop: '0.5rem',
}))
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
   gap: '0.4rem',
}))

const Deadline = styled('div')(() => ({
   display: 'flex',
   backgroundColor: '#F9DCB4',
   borderRadius: '0.5rem',
   padding: ' 0.125rem 0.5rem 0rem 0.5rem',
   marginBottom: '0.5rem',
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
   marginLeft: '0.5rem',
   marginTop: '0.5rem',
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
