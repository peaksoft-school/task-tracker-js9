import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useDispatch } from 'react-redux'
import { Button } from '../UI/button/Button'
import { ControlsIcon, EditIcon, ExitIcon } from '../../assets/icons'
import { ColumnCard } from './ColumnCard'
import { MeadTables } from './MeadTables'
import { MenuItem } from '../UI/menu/MenuItem'
import { updateColumnTitle } from '../../store/column/columnsThunk'
// import { Input } from '../UI/input/Input'

export const Card = ({ column }) => {
   const [openModalInputAddCard, setOpneModalInputAddCard] = useState(false)
   const [editTitle, setEditTitle] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [card, setCards] = useState([])
   const [openModal, setOpneModal] = useState(false)
   const [editInput, setEditInput] = useState('')
   const dispatch = useDispatch()
   const { boardId } = useParams()

   const handleUpdateColumn = () => {
      setEditTitle(!editTitle)
      setEditInput(column.title)
   }

   const changeTitleHandler = (id) => {
      if (column.columnId === id) {
         const updatedColumn = { ...column, title: editInput }
         const data = {
            boardId,
            title: updatedColumn.title,
            columnId: updatedColumn.columnId,
         }
         dispatch(updateColumnTitle(data))
         handleUpdateColumn()
      }
   }

   const handleOpenModal = () => {
      setOpneModal((state) => !state)
   }

   const handleOpenModalAddCard = () => {
      setOpneModalInputAddCard(true)
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
      setOpneModalInputAddCard(false)
   }

   const handleAddCardInputChange = (event) => {
      setInputValue(event.target.value)
   }

   const isButtonDisabled = inputValue === ''

   const closeHandlerEdit = () => {
      setEditTitle(false)
      if (editTitle) {
         changeTitleHandler(column.columnId)
      }
   }
   return (
      <div key={column.id}>
         {editTitle ? (
            <CreateColumn>
               <BackDrop onClick={closeHandlerEdit} />
               <InputColumn
                  aria-label="empty textarea"
                  onChange={(e) => setEditInput(e.target.value)}
                  value={editInput}
               />
               <ControlsIconStyled
                  onClick={(e) => {
                     e.preventDefault()
                     handleOpenModal()
                  }}
               />
            </CreateColumn>
         ) : (
            <ParentTitle key={column.id}>
               <Title onClick={handleUpdateColumn}>{column.title} </Title>
               <StyleMeadIcon>
                  <ControlsIcon
                     onClick={(e) => {
                        e.preventDefault()
                        handleOpenModal()
                     }}
                  />
               </StyleMeadIcon>
            </ParentTitle>
         )}

         {openModal && (
            <>
               <BackDropForColumn onClick={handleOpenModal} />
               <MenuItemStyle open={openModal} onClose={handleOpenModal}>
                  <MeadTables
                     setOpneModal={setOpneModal}
                     columnId={column.columnId}
                  />
               </MenuItemStyle>
            </>
         )}
         <ParentColumnCard>
            {card.map((el) => (
               <ColumnCard key={el.id}>
                  <IconText>
                     <ParagraphText>{el.text}</ParagraphText>
                     <EditIconStyle />
                  </IconText>
               </ColumnCard>
            ))}

            {openModalInputAddCard ? (
               <form onSubmit={handleButtonClickAddCard}>
                  <InputAddCard>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        {openModalInputAddCard && (
                           <InputAddCardStyle
                              type="text"
                              value={inputValue}
                              open={openModalInputAddCard}
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
      </div>
   )
}

const ControlsIconStyled = styled(ControlsIcon)(() => ({
   position: 'absolute',
   zIndex: 100,
   top: '0.7rem',
   right: '1rem',
}))

const ParentTitle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 0.5rem 0 0.5rem',
   marginBottom: '0.89rem',
}))

const Title = styled('p')(() => ({
   color: '#000',
   width: '90%',
   fontFamily: 'Gilroy',
   // fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: 'normal',
   wordWrap: 'break-word',
}))
const StyleMeadIcon = styled('div')(() => ({
   cursor: 'pointer',
   // transition: 'transform 0.4s ease-out',
   // '&:active': {
   //    transform: 'scale(1,2)',
   // },
}))
const MenuItemStyle = styled(MenuItem)(() => ({
   // padding: '1rem 0rem 0.25rem',
   borderRadius: ' 0.625rem',
   backgroundColor: '#FFF',
   boxShadow: '  -12px 1px 36px 0px rgba(34, 60, 80, 0.2)',
   marginLeft: '13.62rem',
   position: 'relative',
}))

const ParentColumnCard = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '0.5rem',
}))

const ParagraphText = styled('p')(() => ({
   width: '100%',
   boxSizing: 'border-box',
   wordWrap: 'break-word',
}))
const IconText = styled('div')(() => ({
   display: 'flex',
   position: 'relative',
}))
const AddPlus = styled('p')(() => ({
   cursor: 'pointer',
   marginLeft: '0.5rem',
   fontWeight: '400',
   marginTop: '0.69rem',
}))

const EditIconStyle = styled(EditIcon)(() => ({
   position: 'absolute',
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
const CreateColumn = styled('div')(() => ({
   width: '280px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '0.3rem',
   borderRadius: '0.5rem',
   padding: '0 0.7rem 1.15rem 0.5rem',
}))

const InputColumn = styled(TextareaAutosize)(() => ({
   width: '14rem',
   resize: 'none',
   overflow: 'hidden',
   zIndex: '44',
   height: '10vh',
   padding: '0.2rem',
   margin: '0 0 0.4rem 0',
   // position: 'relative',
}))

const BackDrop = styled('div')({
   position: 'absolute',
   width: '100%',
   height: '50vh',
   top: '0',
   left: '0',
})
const BackDropForColumn = styled('div')({
   position: 'absolute',
   width: '100%',
   height: '50vh',
   top: '0',
   left: '0',
})
