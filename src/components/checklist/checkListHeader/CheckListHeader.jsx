import React from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { CheckListState } from '../CheckListState'

export const CheckListHeader = ({
   cancelAddItem,
   openModal,
   showModal,
   setShowModal,
}) => {
   const { checkListData } = useSelector((state) => state.checkList)

   return (
      <CheckListHeaderContainer>
         {checkListData?.map((item) => {
            return (
               <CheckListState
                  itemResponseList={item.itemResponseList}
                  id={item?.checkListId}
                  key={item?.checkListId}
                  cancelAddItem={cancelAddItem}
                  setShowModal={setShowModal}
                  openModal={openModal}
                  showModal={showModal}
                  {...item}
               />
            )
         })}
      </CheckListHeaderContainer>
   )
}

const CheckListHeaderContainer = styled('div')({
   width: '41.875rem',
   marginTop: '5rem',
})
