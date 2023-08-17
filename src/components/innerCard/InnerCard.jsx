import { styled } from '@mui/material'
import React from 'react'
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
import { Button } from '../UI/button/Button'
import { Input } from '../UI/input/Input'

import { CheckList } from '../checklist/CheckList'
import { CommentSection } from '../UI/comments/CommentsSection'
import { ModalUi } from '../UI/modal/Modal'

export const InnerCard = ({ open, handleClose }) => {
   const [showMore, setShowMore] = React.useState(false)
   return (
      <ModalUi open={open} onClose={handleClose}>
         <CardContainer>
            <Wrapper>
               <TextContainer>
                  <EditIcon />
                  <CardText>Какая то задача, которую нужно выполнить</CardText>
               </TextContainer>
               <CloseIcon onClick={handleClose} />
            </Wrapper>
            <CardWrapper>
               <CardContainerInner>
                  <Labels />
                  <DataContainer>
                     <div>
                        <Title>Start Date</Title>
                        <DateStart>
                           Sep 9, 2022 at 12:51 PM <DownIcon />
                        </DateStart>
                     </div>
                     <div>
                        <Title>Due Date</Title>
                        <DateStart>
                           Sep 9, 2022 at 12:51 PM <DownIcon />
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
                  <DescriptionInput
                     type="text"
                     placeholder="Add a description"
                  />
                  <ActionButtonsContainer>
                     <CancelButton>Cancel</CancelButton>
                     <AddButton>Save</AddButton>
                  </ActionButtonsContainer>
                  <CheckList />
               </CardContainerInner>
               <CardRight>
                  <CardRightContainer>
                     <Title>Add</Title>
                     <AddWrapper>
                        <AddItem>
                           <MemberIcon />
                           <AddText>Members</AddText>
                        </AddItem>
                        <AddItem>
                           <ClockIcon />
                           <AddText>Estimation</AddText>
                        </AddItem>
                        <AddItem>
                           <LabelIcon />
                           <AddText>Label</AddText>
                        </AddItem>
                        <AddItem>
                           <AttachIcon />
                           <AddText>Attachment</AddText>
                        </AddItem>
                        <AddItem>
                           <CheckIcon />
                           <AddText>Checklist</AddText>
                        </AddItem>
                     </AddWrapper>
                     <Title>Actions</Title>
                     <ActionsItem>
                        <AddItem>
                           <DeleteIcon />
                           <AddText>Delete</AddText>
                        </AddItem>
                        <AddItem>
                           <ArchiveIcon />
                           <AddText>Archive</AddText>
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

const DescriptionTitle = styled('h4')(() => ({}))

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

const ActionButtonsContainer = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
   margin: '10px 10px 0 0',
   gap: '1rem',
})

const AddButton = styled(Button)({
   fontFamily: 'CarePro',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   color: '#fff',
   borderRadius: ' 1.5rem',
   padding: '6px 16px',
   textTransform: 'capitalize',
   fontSize: '0.875rem',
   '&:hover': {
      backgroundColor: '#015C91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
})

const CancelButton = styled(Button)({
   fontFamily: 'CarePro',
   color: '#919191',
   borderRadius: ' 1.5rem',
   height: '2.1rem',
   width: '5.41313rem',
   padding: '0.275rem 1rem 0.375rem 0.5rem ',
   backgroundColor: '#F0F0F0',
   textAlign: 'center',
   fontSize: '0.91rem',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#cecdcd',
      color: '#fff',
      '&:active': {
         backgroundColor: '#F0F0F0',
      },
   },
})

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
   padding: '6px 0 6px 16px',
   width: '154px',
   backgroundColor: '#F4F5F7',
   borderRadius: '8px',
   display: 'flex',
   alignItems: 'center',
}))

const AddText = styled('p')(() => ({
   marginLeft: '8px',
}))
