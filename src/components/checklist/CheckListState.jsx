import React, { useState } from 'react'
import CheckListItem from './checkListHeader/CheckListItem'
import { CheckListMain } from './checkListMain/CheckListMain'

export const CheckListState = ({
   title,
   openModal,
   itemResponseList,
   id,
   handleDeleteItem,
   showModal,
   setShowModal,
}) => {
   const [showInputs, setShowInputs] = useState(false)

   const cancelAddItem = () => {
      setShowInputs((prev) => !prev)
   }

   return (
      <>
         <CheckListItem
            cancelAddItem={cancelAddItem}
            showInputs={showInputs}
            title={title}
            openModal={openModal}
            handleDeleteItem={handleDeleteItem}
            showModal={showModal}
            setShowModal={setShowModal}
            id={id}
         />

         {showInputs && (
            <CheckListMain
               itemResponseList={itemResponseList}
               id={id}
               openModal={openModal}
               showModal={showModal}
               setShowModal={setShowModal}
               handleDeleteItem={handleDeleteItem}
            />
         )}
      </>
   )
}
