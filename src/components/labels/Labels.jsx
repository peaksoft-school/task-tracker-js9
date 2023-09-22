import { Tooltip, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ExitIcon, PLUSICON } from '../../assets/icons'
import { deleteLabel, getLabels } from '../../store/getLabels/labelsThunk'
import { labelActions } from '../../store/getLabels/labelsSlice'
import { AddedLabelToCard } from '../addedLabelToCard/AddedLabelToCard'
import { ModalUi } from '../UI/modal/Modal'

export const Labels = () => {
   const dispatch = useDispatch()
   const { label, labelDrop } = useSelector((state) => state.labels)

   useEffect(() => {
      dispatch(getLabels())
   }, [dispatch])

   const onRemoveLabel = (id) => {
      dispatch(deleteLabel(id))
   }
   const addLabelOpenModal = () => {
      dispatch(labelActions.openModal())
   }

   const addLabelCloseModal = () => {
      dispatch(labelActions.closeModal())
   }
   return (
      <div>
         <HeadingLabel>Labels</HeadingLabel>

         <AllContainer>
            {label?.map((item) => (
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
                     onClick={() => onRemoveLabel(item.labelId)}
                  />
               </ContainerLabels>
            ))}
            <PLUSICON
               onClick={addLabelOpenModal}
               style={{ cursor: 'pointer', marginTop: '2px' }}
            />
            {labelDrop && (
               <ModalUi open={labelDrop}>
                  <AddedLabelToCard addLabelCloseModal={addLabelCloseModal} />
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
