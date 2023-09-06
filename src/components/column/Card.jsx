import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '../UI/button/Button'
import { CloseIcon, ControlsIcon, EditIcon, ExitIcon } from '../../assets/icons'
import { ColumnCard } from './ColumnCard'
import { MeadTables } from './MeadTables'
import { MenuItem } from '../UI/menu/MenuItem'
// import { axiosInstance } from '../../config/axiosInstance'
import { updateColumnTitle } from '../../store/column/columnsThunk'
import { Input } from '../UI/input/Input'

export const Card = ({ column }) => {
   const [openModalInputAddCard, setOpneModalInputAddCard] = useState(false)
   const [editTitle, setEditTitle] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [card, setCards] = useState([])
   const [openModal, setOpneModal] = useState(false)
   const [editInput, setEditInput] = useState('')
   const dispatch = useDispatch()
   const { boardId } = useParams()

   // const getColumns = async () => {
   //    try {
   //       const { data } = await axiosInstance.get(`/api/column/${boardId}`)
   //       console.log(data.data, 'data')
   //       setEditInput(data.data)
   //    } catch (error) {
   //       return error
   //    }
   // }

   // useEffect(() => {
   //    getColumns(boardId)
   // }, [])
   console.log(editInput, 'save')

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
               <TitleOfCreateColumn>
                  <NameOfColumn>Name of column</NameOfColumn>
                  <CloseIcon onClick={handleUpdateColumn} />
               </TitleOfCreateColumn>
               <InputColumn
                  type="text"
                  placeholder="Name"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
               />
               <ButtonCreateColumn
                  onClick={() => changeTitleHandler(column.columnId)}
               >
                  Save
               </ButtonCreateColumn>
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
            <MenuItemStyle
               width="16.6875rem"
               open={openModal}
               onClose={handleOpenModal}
            >
               <MeadTables columnId={column.columnId} />
            </MenuItemStyle>
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

const ParentTitle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 0.5rem 0 0.5rem',
   marginBottom: '0.89rem',
}))

const Title = styled('p')(() => ({
   color: '#000',
   fontFamily: ' Gilroy',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: 'normal',
}))
const StyleMeadIcon = styled('div')(() => ({
   cursor: 'pointer',
   backgroundColor: '#f0f0f0',
   transition: 'transform 0.4s ease-out',
   '&:active': {
      transform: 'scale(1,2)',
   },
}))
const MenuItemStyle = styled(MenuItem)(() => ({
   padding: '1rem 0rem 0.25rem',
   borderRadius: ' 0.625rem',
   backgroundColor: '#FFF',
   boxShadow: '  -12px 1px 36px 0px rgba(34, 60, 80, 0.2)',
   marginLeft: '13.62rem',
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
   height: '118px',
   display: 'flex',
   flexDirection: 'column',
   gap: '0.3rem',
   borderRadius: '0.5rem',
   padding: '0 0.7rem 0 0.7rem',
}))
const TitleOfCreateColumn = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))
const NameOfColumn = styled('p')(() => ({
   fontSize: '16px',
   color: '#919191',
}))
const ButtonCreateColumn = styled(Button)(() => ({
   width: '4.8rem',
   height: '1.875rem',
   textTransform: 'inherit',
   marginLeft: '11.2rem',
   padding: '3px 16px 0 16px',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#fffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
      color: '#fffff',
   },
}))
const InputColumn = styled(Input)(() => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      width: '16rem',
      zIndex: 1,
   },
   input: {
      width: '19.4625rem',
      height: '1.35rem',
      padding: ' 0.375rem 1rem',
      alignItems: ' center',
      borderRadius: '0.5rem',
   },
}))

const BackDrop = styled('div')({
   position: 'absolute',
   width: '100%',
   height: '90vh',
   top: '0',
   left: '0',
})
