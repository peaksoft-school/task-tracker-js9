import { styled } from '@mui/material'
import React from 'react'
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
   LabelIcon,
   MemberIcon,
} from '../../assets/icons'
import { Labels } from '../labels/Labels'
import { Input } from '../UI/input/Input'

import { CheckList } from '../checklist/CheckList'
import { CommentSection } from '../UI/comments/CommentsSection'
import { ModalUi } from '../UI/modal/Modal'
import { Attachment } from '../attachment/Attachment'
import { labelActions } from '../../store/getLabels/labelsSlice'

export const InnerCard = ({
   open,
   handleClose,
   setSaveTitle,
   setSaveDescription,
   displayText,
   setDisplayText,
   displayTitle,
   setDisplayTitle,
}) => {
   const [showMore, setShowMore] = React.useState(false)
   const inputRef = React.useRef(null)
   const titleRef = React.useRef(null)
   const [titleText, setTitleText] = React.useState('')
   const [inputText, setInputText] = React.useState('')
   const [isEditing, setIsEditing] = React.useState(true)
   const [isEditTitle, setIsEditTitle] = React.useState(true)
   const [openAttachment, setOpenAttachment] = React.useState(false)

   const dispatch = useDispatch()

   const addLabelOpenModalInInnerCard = () => {
      dispatch(labelActions.openModal())
   }

   const handleInputChange = (e) => {
      setInputText(e.target.value)
   }
   const handleTitleChange = (e) => {
      setTitleText(e.target.value)
   }

   const handleDocumentClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
         setDisplayText(inputText)
         setSaveDescription(inputText)
         setIsEditing(false)
      }
   }
   const documentClick = (event) => {
      if (titleRef.current && !titleRef.current.contains(event.target)) {
         setDisplayTitle(titleText)
         setSaveTitle(titleText)
         setIsEditTitle(true)
      }
   }

   const handleEditClick = () => {
      setIsEditing(true)
   }
   const handleEditTitleClick = () => {
      setIsEditTitle(false)
   }

   React.useEffect(() => {
      document.addEventListener('mousedown', handleDocumentClick)
      return () => {
         document.removeEventListener('mousedown', handleDocumentClick)
      }
   }, [inputText])
   React.useEffect(() => {
      document.addEventListener('mousedown', documentClick)
      return () => {
         document.removeEventListener('mousedown', documentClick)
      }
   }, [titleText])
   const openDoor = () => {
      setOpenAttachment((prev) => !prev)
   }
   return (
      <ModalUi open={open} onClose={handleClose}>
         <CardContainer ref={(inputRef, titleRef)}>
            <Wrapper>
               <TextContainer>
                  <EditIcon onClick={handleEditTitleClick} />
                  {isEditTitle ? (
                     <CardText onClick={handleEditTitleClick}>
                        {displayTitle}
                     </CardText>
                  ) : (
                     <TitileInput
                        type="text"
                        value={titleText}
                        onChange={handleTitleChange}
                     />
                  )}
               </TextContainer>
               <CloseIcon onClose={handleClose} />
            </Wrapper>
            <CardWrapper>
               <CardContainerInner>
                  <Labels />
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
                     <DownIcon />
                     <DescriptionTitle>Description</DescriptionTitle>
                  </Description>
                  {isEditing ? (
                     <DescriptionInput
                        type="text"
                        placeholder="Add a description"
                        value={inputText}
                        onChange={handleInputChange}
                     />
                  ) : (
                     <DescriptionText onClick={handleEditClick}>
                        {displayText}
                     </DescriptionText>
                  )}
                  <CheckList />
                  {openAttachment && <Attachment />}
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
                              <AddText onClick={addLabelOpenModalInInnerCard}>
                                 Label
                              </AddText>
                           ) : null}
                        </AddItem>
                        <AddItem>
                           <AttachIcon />
                           {showMore === false ? (
                              <AddText onClick={openDoor}>Attachment</AddText>
                           ) : null}
                        </AddItem>
                        <AddItem>
                           <CheckIcon />
                           {showMore === false ? (
                              <AddText>Checklist</AddText>
                           ) : null}
                        </AddItem>
                     </AddWrapper>
                     <Title>Actions</Title>
                     <ActionsItem>
                        <AddItem>
                           <DeleteIcon />
                           {showMore === false ? (
                              <AddText>Delete</AddText>
                           ) : null}
                        </AddItem>
                        <AddItem>
                           <ArchiveIcon />
                           {showMore === false ? (
                              <AddText>Archive</AddText>
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
   )
}

const CardContainer = styled('div')(() => ({
   width: '1150px',
   borderRadius: '8px',
   padding: '16px 20px',
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

const DescriptionInput = styled(Input)(() => ({
   input: {
      backgroundColor: 'none',
      fontSize: '1rem',
      width: '39.9931rem',
      borderRadius: '5rem',
      padding: '1.3rem 1.3rem 5.5rem',
   },
   marginTop: '0.5rem',
}))

const DescriptionText = styled('p')(() => ({
   margin: '15px 25px 20px',
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
}))

const AddText = styled('p')(() => ({
   marginLeft: '8px',
   width: '95px',
}))

const TitileInput = styled(Input)(() => ({
   input: {
      backgroundColor: 'none',
      fontSize: '1rem',
      width: '20rem',
      borderRadius: '5rem',
      padding: '1rem 0',
   },
}))
