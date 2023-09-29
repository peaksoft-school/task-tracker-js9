import { styled, IconButton } from '@mui/material'
import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { comments } from '../../utils/constants/comments'
import {
   ArchiveIcon,
   AttachIcon,
   CheckIcon,
   ClockIcon,
   CloseIcon,
   DeleteIcon,
   DownIcon,
   EditIcon,
   ExitIcon,
   LabelIcon,
   MemberIcon,
} from '../../assets/icons'
import { Labels } from '../labels/Labels'
// import { Input } from '../UI/input/Input'

import { CheckList } from '../checklist/CheckList'
import { CommentSection } from '../UI/comments/CommentsSection'
import { Button } from '../UI/button/Button'
import { createdCheckListRequest } from '../../store/checkList/CheckListThunk'
import { ModalUi } from '../UI/modal/Modal'
import { cardPut, deleteCardbyCardId } from '../../store/cards/cardsThunk'
import { getCardArchve } from '../../store/getArchive/archiveThunk'
import { Attachment } from '../attachment/Attachment'

export const InnerCard = ({
   isInnerCardOpen,
   setOpenModal,
   displayText,
   handleClose,
   displayTitle,
   cardId,
   cardData,
}) => {
   const [showMore, setShowMore] = useState(false)
   const inputRef = useRef(null)
   const [title, setTitleText] = useState(cardData.title)
   const [description, setInputText] = useState(cardData.description)
   const [isEditing, setIsEditing] = useState(true)
   const [isEditTitle, setIsEditTitle] = useState(true)
   const [openCheckListModal, setOpenCheckListModal] = useState(false)
   const [titleCheckList, setTitleCheckList] = useState('')
   const [handleAttachments, setHandleAttachments] = useState(false)
   const { boardId } = useParams()

   const dispatch = useDispatch()
   // const navigate = useNavigate()

   // const { id, boardId } = useParams()

   // const closeInnerPage = () => {
   //    navigate(`/mainPage/${id}/boards/${boardId}/board`)
   // }
   // console.log(cardData, 'cardData in inner card')

   const archiveCard = () => {
      dispatch(getCardArchve(cardId))
   }
   const handleDocumentClick = (event) => {
      if (
         inputRef.current &&
         !inputRef.current.contains(event.target) &&
         !event.target.tagName.toLowerCase().match(/input|textarea/)
      ) {
         dispatch(
            cardPut({ cardId: cardData.cardId, boardId, title, description })
         )
         setIsEditing(false)
         setIsEditTitle(false)
      }
   }

   const handleEditClick = () => {
      setIsEditing(true)
   }
   const handleEditTitleClick = () => {
      setIsEditTitle(true)
   }

   React.useEffect(() => {
      document.addEventListener('mousedown', handleDocumentClick)
      return () => {
         document.removeEventListener('mousedown', handleDocumentClick)
      }
   })

   const openCheckListModalHandler = () => {
      setOpenCheckListModal(true)
   }

   const closeCheckListModalHandler = () => {
      setOpenCheckListModal(false)
   }

   const addCheckListHandler = () => {
      const data = {
         title: titleCheckList,
         cardId,
      }
      dispatch(createdCheckListRequest(data))
      closeCheckListModalHandler()
      setTitleCheckList('')
   }

   const deleteCardByIdHandler = () => {
      dispatch(deleteCardbyCardId({ cardId, boardId }))
      setOpenModal(false)
   }

   const onClickAttachments = () => {
      setHandleAttachments((prev) => !prev)
   }

   return (
      <div>
         <ModalUi open={isInnerCardOpen} onClose={handleClose}>
            <CardContainer ref={inputRef}>
               <Wrapper>
                  <TextContainer onClick={handleEditTitleClick}>
                     <EditIcon fill="gray" onClick={handleEditTitleClick} />
                     {isEditTitle || displayText === '' ? (
                        <TitileInput
                           onChange={(e) => setTitleText(e.target.value)}
                           value={title}
                           ref={inputRef}
                        />
                     ) : (
                        <CardText>{displayTitle}</CardText>
                     )}
                  </TextContainer>
                  <CloseIcon
                     onClick={handleClose}
                     fill="red"
                     style={{ cursor: 'pointer' }}
                  />
               </Wrapper>
               <CardWrapper>
                  <CardContainerInner>
                     <Labels labels={cardData.labelResponses} />
                     <DataContainer>
                        <div>
                           <Title>Start Date</Title>
                           <DateStart>
                              Sep 9, 2022 at 12:51 PM
                              <DownIcon style={{ marginLeft: '0.5rem' }} />
                           </DateStart>
                        </div>
                        <div>
                           <Title>Due Date</Title>
                           <DateStart>
                              Sep 9, 2022 at 12:51 PM
                              <DownIcon style={{ marginLeft: '0.5rem' }} />
                           </DateStart>
                        </div>
                        <div>
                           <Title>Members</Title>
                           <DateStart />
                        </div>
                     </DataContainer>
                     <Description>
                        <DownIcon fill="gray" onClick={handleEditClick} />
                        <DescriptionTitle style={{ color: 'gray' }}>
                           Description
                        </DescriptionTitle>
                     </Description>

                     {isEditing || displayText === '' ? (
                        <div>
                           <DescriptionInput
                              type="text"
                              placeholder="Add a description"
                              value={description}
                              onChange={(e) => setInputText(e.target.value)}
                              ref={inputRef}
                           />
                        </div>
                     ) : (
                        <DescriptionText onClick={handleEditClick}>
                           {displayText}
                        </DescriptionText>
                     )}
                     <CheckList />
                     {handleAttachments ? <Attachment /> : null}
                  </CardContainerInner>
                  <CardRight>
                     <CardRightContainer>
                        <Title>Add</Title>
                        <AddWrapper>
                           <AddItem>
                              <MemberIcon />
                              {showMore === false ? (
                                 <AddText>Members</AddText>
                              ) : null}
                           </AddItem>
                           <AddItem>
                              <ClockIcon style={{ width: '16px' }} />
                              {showMore === false ? (
                                 <AddText>Estimation</AddText>
                              ) : null}
                           </AddItem>
                           <AddItem>
                              <LabelIcon />
                              {showMore === false ? (
                                 <AddText>Label</AddText>
                              ) : null}
                           </AddItem>
                           <AddItem>
                              <AttachIcon />
                              {showMore === false ? (
                                 <AddText onClick={onClickAttachments}>
                                    Attachment
                                 </AddText>
                              ) : null}
                           </AddItem>
                           <AddItem onClick={openCheckListModalHandler}>
                              <CheckIcon />
                              {showMore === false ? (
                                 <AddText>Checklist</AddText>
                              ) : null}
                           </AddItem>
                           {openCheckListModal ? (
                              <>
                                 <BackDrop
                                    onClick={closeCheckListModalHandler}
                                 />
                                 <ModalContent>
                                    <ModalHeader>
                                       <p>{}</p>
                                       <p>Add checklist</p>
                                       <IconButtonStyled
                                          onClick={closeCheckListModalHandler}
                                       >
                                          <ExitIcon fill="black" />
                                       </IconButtonStyled>
                                    </ModalHeader>
                                    <ModalInputBox>
                                       <StyledInput
                                          onChange={(e) =>
                                             setTitleCheckList(e.target.value)
                                          }
                                          value={titleCheckList}
                                          type="text"
                                          placeholder="Title"
                                       />
                                    </ModalInputBox>
                                    <ModalButtonBox>
                                       <ButtonStyled
                                          onClick={addCheckListHandler}
                                       >
                                          Add checklist
                                       </ButtonStyled>
                                    </ModalButtonBox>
                                 </ModalContent>
                              </>
                           ) : null}
                        </AddWrapper>
                        <Title>Actions</Title>
                        <ActionsItem>
                           <AddItem>
                              <DeleteIcon />
                              {showMore === false ? (
                                 <AddText onClick={deleteCardByIdHandler}>
                                    Delete
                                 </AddText>
                              ) : null}
                           </AddItem>
                           <AddItem>
                              <ArchiveIcon />
                              {showMore === false ? (
                                 <AddText onClick={archiveCard}>
                                    Archive
                                 </AddText>
                              ) : null}
                           </AddItem>
                        </ActionsItem>
                     </CardRightContainer>
                     <CommentSection
                        showMore={showMore}
                        setShowMore={setShowMore}
                        comments={comments}
                     />
                  </CardRight>
               </CardWrapper>
            </CardContainer>
         </ModalUi>
      </div>
   )
}

const CardContainer = styled('div')(() => ({
   width: '1150px',
   borderRadius: '8px',
   padding: '16px 20px',
   height: '100%',
}))

const Wrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '16px',
}))

const CardWrapper = styled('div')(() => ({
   display: 'flex',
   width: '670px',
}))

const CardText = styled('p')(() => ({
   paddingLeft: '6px',
}))

const TextContainer = styled('div')(() => ({
   display: 'flex',
   gap: '0.5rem',
   alignItems: 'center',
}))

const CardContainerInner = styled('div')(() => ({}))
const DataContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   margin: '20px 0',
   width: '682px',
}))
const Title = styled('h4')(() => ({
   color: '#919191',
   fontSize: '0.875rem',
   fontWeight: '400',
   marginBottom: '6px',
}))
const DateStart = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   padding: '8px 16px',
   borderRadius: '8px',
   border: '1px solid #D0D0D0',
}))

const Description = styled('div')(() => ({
   display: 'flex',
}))

const DescriptionTitle = styled('h4')(() => ({
   marginLeft: '0.5rem',
}))

const DescriptionInput = styled('textarea')(() => ({
   marginTop: '0.5rem',
   minHeight: '6.1875rem',
   width: '42.2rem',
   padding: '0.5rem 1rem',
   background: '#ffffff',
   borderColor: '#989898',
   borderRadius: '0.5rem',
   resize: 'none',
   fontSize: '1rem',
   overflow: 'hidden',
   fontFamily: 'CarePro',
}))

const DescriptionText = styled('p')(() => ({
   padding: '0.5rem 1rem',
   width: '39.9931rem',
   wordWrap: 'break-word',
}))

const CardRight = styled('div')(() => ({
   margin: '0 20px',
}))

const CardRightContainer = styled('div')(() => ({
   width: '377px',
   margin: '6px 0 16px 0',
}))

const ActionsItem = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '8px',
}))
const AddWrapper = styled('div')(() => ({
   margin: '8px 0',
   display: 'flex',
   flexWrap: 'wrap',
   gap: '8px',
}))
const AddItem = styled('div')(() => ({
   padding: '6px 16px 6px 16px',
   backgroundColor: '#F4F5F7',
   borderRadius: '8px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
}))

const AddText = styled('p')(() => ({
   marginLeft: '8px',
   width: '95px',
}))

const TitileInput = styled('textarea')(() => ({
   width: '40.3rem',

   padding: '0.5em 0 0 0.4rem ',
   // lineHeight: '1.7rem',
   maxHeight: '2.5rem',
   background: '#ffffff',
   borderColor: '#989898',
   borderRadius: '0.5rem',
   resize: 'none',
   fontSize: '1rem',
   overflow: 'hidden',
   fontFamily: 'CarePro',
}))

const ModalContent = styled('div')({
   backgroundColor: '#fff',
   borderRadius: '5px',
   width: '17.75rem',
   height: '9.125rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
   position: 'absolute',
   top: '10rem',
})

const ModalHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '17.75rem',
})

const ModalInputBox = styled('div')({})

const ModalButtonBox = styled('div')({})

const ButtonStyled = styled(Button)({
   display: 'flex',
   width: '15.25rem',
   padding: '0.375rem 1rem',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      backgroundColor: '#5286ff',
   },
})

const StyledInput = styled('input')({
   display: 'flex',
   width: '15.25rem',
   padding: '0.375rem 1rem',
   alignItems: 'center',
   gap: '0.5rem',
   borderRadius: '0.5rem',
   border: '1px solid #D0D0D0',
})

const IconButtonStyled = styled(IconButton)({
   cursor: 'pointer',
   color: 'black',
})

const BackDrop = styled('div')({
   position: 'absolute',
   width: '100%',
   height: '100vh',
})
