import { styled } from '@mui/material'
import { useState } from 'react'
import { Input } from '../UI/input/Input'
import { CardInColumn } from './Card'
import { EditIcon } from '../../assets/icons'

export const Column = () => {
   const [openModalAddCard, setOpneModalAddCard] = useState(false)

   const [inputValue, setInputValue] = useState('')

   const handleOpenModalAddCard = () => {
      setOpneModalAddCard((state) => !state)
   }

   const handleButtonClickAddCard = () => {
      console.log(inputValue)
   }

   const handleAddCardInputChange = (event) => {
      console.log(inputValue)
      setInputValue(event.target.value)
   }
   return (
      <ParentColumnStyle>
         <ColumnStyle>
            <CardInColumn />
            {openModalAddCard ? (
               <InputAddCard>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <InputAddCardStyle
                        // onClose={handleOpenModalAddCard}
                        // padding="1rem"
                        type="text"
                        value={inputValue}
                        open={openModalAddCard}
                        placeholder="Enter a title for this card"
                        onChange={handleAddCardInputChange}
                     />
                     <EditIconStyle />
                  </div>

                  <AddPlus onClick={handleButtonClickAddCard}>
                     + Add a card
                  </AddPlus>
               </InputAddCard>
            ) : (
               <AddPlus onClick={handleOpenModalAddCard}>+ Add a card</AddPlus>
            )}
         </ColumnStyle>
      </ParentColumnStyle>
   )
}

const ParentColumnStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '50px',
}))

const ColumnStyle = styled('div')(() => ({
   width: '17.5rem',
   // display: 'flex',
   // justifyContent: 'space-between',
   borderRadius: '0.5rem',
   backgroundColor: 'rgba(145, 145, 145, 0.12)',
   paddingBottom: '1rem',
   paddingTop: '0.69rem',
   paddingRight: '0.5rem',
   paddingLeft: '0.5rem',
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
      height: '3.75rem',
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
}))

const EditIconStyle = styled(EditIcon)(() => ({
   position: 'absolute',
   // marginRight: '500px',
   marginLeft: '14.81rem',
   marginBottom: '2.6rem',
   cursor: 'pointer',
}))
