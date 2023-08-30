import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { checkListGetRequest } from '../../store/checkList/CheckListThunk'
import { CheckListHeader } from './checkListHeader/CheckListHeader'

export const CheckList = ({ title }) => {
   const [showModal, setShowModal] = useState(false)

   const dispatch = useDispatch()

   const openModal = () => {
      setShowModal((prev) => !prev)
   }

   useEffect(() => {
      dispatch(checkListGetRequest(1))
   }, [])

   return (
      <ChecklistContainer>
         <CheckListHeader
            title={title}
            openModal={openModal}
            showModal={showModal}
            setShowModal={setShowModal}
         />
      </ChecklistContainer>
   )
}

const ChecklistContainer = styled('div')({})
