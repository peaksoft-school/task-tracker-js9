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
         {checkListData !== undefined && checkListData.length > 0
            ? checkListData?.map((item) => {
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
              })
            : null}
      </CheckListHeaderContainer>
   )
}

const CheckListHeaderContainer = styled('div')({
   width: '41.875rem',
   marginTop: '5rem',
})
