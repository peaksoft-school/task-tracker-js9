import { Tooltip, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ExitIcon, PLUSICON } from '../../assets/icons'
import { getAllLabelByCardId } from '../../store/getLabels/labelsThunk'
import { AddedLabelToCard } from '../addedLabelToCard/AddedLabelToCard'
import { ModalUi } from '../UI/modal/Modal'
import { axiosInstance } from '../../config/axiosInstance'
import { showSnackbar } from '../UI/snackbar/Snackbar'

export const Labels = ({ cardId }) => {
   const dispatch = useDispatch()
   const { labelByCardId } = useSelector((state) => state.labels)
   const [openAddLabelModal, setOpenAddLabelModal] = useState(false)

   useEffect(() => {
      dispatch(getAllLabelByCardId(cardId))
   }, [dispatch])

   const addLabelOpenModal = () => {
      setOpenAddLabelModal(true)
   }

   const addLabelCloseModal = () => {
      setOpenAddLabelModal(false)
   }

   const deleteLabelInCard = async (id) => {
      try {
         // eslint-disable-next-line no-unused-vars
         const response = await axiosInstance.delete(
            `/api/labels/${id}/${cardId}`
         )
         addLabelCloseModal()
         dispatch(getAllLabelByCardId(cardId))
         showSnackbar({
            message: 'Successfully deleted label ',
            severity: 'success',
         })
      } catch (error) {
         showSnackbar({
            message: 'ERROR',
            severity: 'error',
         })
      }
   }

   return (
      <div>
         <HeadingLabel>Labels</HeadingLabel>

         <AllContainer>
            {labelByCardId?.map((item) => (
               <ContainerLabels
                  style={{ backgroundColor: item.color }}
                  key={item.labelId}
               >
                  <TextLabels title={item.description} arrow>
                     {item.description}
                  </TextLabels>
                  <ExitIcon
                     fill="gray"
                     style={{ cursor: 'pointer' }}
                     onClick={() => deleteLabelInCard(item.labelId)}
                  />
               </ContainerLabels>
            ))}
            <PLUSICON
               onClick={addLabelOpenModal}
               style={{ cursor: 'pointer', marginTop: '2px' }}
            />
            {openAddLabelModal && (
               <ModalUi open={openAddLabelModal} onClose={addLabelCloseModal}>
                  <AddedLabelToCard
                     reloadedLabels={() => {
                        dispatch(getAllLabelByCardId(cardId))
                     }}
                     addLabelCloseModal={addLabelCloseModal}
                     cardId={cardId}
                  />
               </ModalUi>
            )}
         </AllContainer>
      </div>
   )
}

const HeadingLabel = styled('p')(({ theme }) => ({
   color: theme.palette.secondary.gray,
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
   marginBottom: '0.5rem',
}))

const AllContainer = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '0.62rem',
}))

const ContainerLabels = styled('div')(() => ({
   padding: ' 0.25rem 0.375rem 0.25rem 0.625rem',
   borderRadius: '0.375rem',
   display: 'flex',
   alignItems: 'center',
   gap: '0.34rem',
   color: '#FFF',
}))

const TextLabels = styled(Tooltip)(() => ({
   color: '#FFF',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: '500',
   lineHeight: ' normal',
   maxWidth: '11.25rem',
   maxHeight: '1rem',
   cursor: 'pointer',
}))
