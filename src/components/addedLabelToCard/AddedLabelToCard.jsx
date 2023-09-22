/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { styled as muiStyled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { CloseIcon } from '../../assets/icons'
import { axiosInstance } from '../../config/axiosInstance'
import { showSnackbar } from '../UI/snackbar/Snackbar'

export const AddedLabelToCard = ({
   addLabelCloseModal,
   cardId,
   reloadedLabels,
}) => {
   const [labels, setLabels] = useState([])

   useEffect(() => {
      const getLabels = async () => {
         try {
            const { data } = await axiosInstance('/api/labels')
            setLabels(data)
         } catch (error) {
            console.log(error, 'ERROR MESSAGE')
         }
      }
      getLabels()
   }, [])

   const addLabelToCard = async (id) => {
      try {
         const response = await axiosInstance.put(
            `/api/labels/add-label-to-card/${cardId}/${id}`
         )
         addLabelCloseModal()
         reloadedLabels()
         showSnackbar({
            message: 'Successfully added labels',
            severity: 'success',
         })
      } catch (error) {
         showSnackbar({
            message: 'Already have this color :(',
            severity: 'error',
         })
         console.log(error)
      }
   }

   return (
      <Container>
         <Wrapper>
            <WrapperTitle>
               <Title>Label</Title>
               <IconButton>
                  <CloseIcon onClick={addLabelCloseModal} />
               </IconButton>
            </WrapperTitle>
            {labels.map((label, idx) => (
               <WrapperTask key={label.id}>
                  <Task
                     onClick={() => addLabelToCard(label.labelId)}
                     key={label.id}
                     style={{ backgroundColor: label.color }}
                  >
                     {label.description}
                  </Task>
               </WrapperTask>
            ))}
         </Wrapper>
      </Container>
   )
}

const Container = muiStyled('div')(() => ({
   display: 'flex',
   backgroundColor: 'rgba(0, 0, 0, 0.3)',
   fontFamily: 'CarePro',
}))

const Wrapper = muiStyled('div')(() => ({
   padding: '1.1rem 1.2rem 1rem ',
   backgroundColor: '#fff',
}))

const WrapperTitle = muiStyled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   alignItems: 'center',
   marginBottom: '0.75rem',
}))

const Title = muiStyled('h4')(() => ({
   fontWeight: '400',
   marginRight: '6.5rem',
   fontFamily: 'CarePro',
}))

const WrapperTask = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Task = muiStyled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '15.63rem',
   padding: '0.3rem 0 0.3rem 1rem',
   borderRadius: '6px',
   margin: '0.2rem 0.6rem 0.2rem 0',
   fontWeight: '500',
   color: '#fff',
}))

const StyledInputBase = muiStyled('input')(() => ({
   display: 'flex',
   alignItems: 'center',
   fontFamily: 'CarePro',
   width: '15.54rem',
   padding: ' 0.45rem 0 0.45rem 1rem',
   borderRadius: '6px',
   margin: ' 0.2rem 0.5rem 0.2rem 0',
   fontWeight: '500',
   color: '#fff',
   border: 'none',
   '&:focus': {
      outline: '1px solid rgba(0, 0, 0, 0.6)',
   },
   '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.9rem',
   },
}))
