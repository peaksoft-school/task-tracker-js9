import React, { useState } from 'react'
import { TextField, styled } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as Yup from 'yup'
import { EditIcon, FrameIcon } from '../../assets/icons'
import { StarFilter } from './filter/StarFilter'
import { Filter } from './filter/Filter'
import { Menu } from './menu/Menu'
import { Avatars } from './avatars/Avatars'
import { getBoardById, updateBord } from '../../store/board/boardThunk'
import { ModalUi } from '../UI/modal/Modal'
import { Button } from '../UI/button/Button'
import { Participant } from './inviteModal/Participant'

export const LayoutMenu = () => {
   const [openFilterModal, setOpenFilterModal] = useState(false)
   const [open, setOpen] = useState(null)
   const [showBoard, setShowBoard] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [openNewInvite, setOpenNewInvite] = useState(false)
   const { boardId } = useParams()
   const { boardById } = useSelector((state) => state.board)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(getBoardById(boardId))
   }, [])

   const openFilterModalHandler = () => {
      setOpenFilterModal((prev) => !prev)
      setOpen('close')
   }

   const closeFilterModalHandler = () => {
      setOpenFilterModal(false)
   }

   // Создание схемы валидации
   const validationSchema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      img: Yup.string().required('IMG is required'),
   })

   // Использование Formik
   const formik = useFormik({
      initialValues: {
         title: boardById?.title || '',
         img: 'asdawawd',
      },
      validationSchema,
      onSubmit: (values) => {
         const data = {
            title: values.title,
            boardI: boardId,
            backGround: values.img,
         }
         dispatch(updateBord({ data, boardId }))
         setShowBoard(false)
      },
   })

   React.useEffect(() => {
      formik.setValues({
         title: boardById?.title,
      })
   }, [boardById])

   const clickEditHandler = () => {
      setShowBoard(true)
   }

   const openModalHandler = () => {
      setOpenModal((prev) => !prev)
      setOpenNewInvite(false)
   }

   return (
      <>
         <LayoutMenuContainer>
            <div>
               {showBoard ? (
                  <ModalUi open={showBoard} onClose={() => setShowBoard(false)}>
                     <form onSubmit={formik.handleSubmit}>
                        <ContainerInputs>
                           <div className="block-input">
                              <div>
                                 <InputStyled
                                    type="text"
                                    label="Title"
                                    variant="outlined"
                                    size="small"
                                    name="title"
                                    {...formik.getFieldProps('title')} // Подключение Formik
                                 />
                              </div>
                              {formik.touched.title && formik.errors.title && (
                                 <ErrorMessage>
                                    {formik.errors.title}
                                 </ErrorMessage>
                              )}
                           </div>
                           <div className="block-input">
                              <div>
                                 <InputStyled
                                    type="text"
                                    label="Image"
                                    variant="outlined"
                                    size="small"
                                    {...formik.getFieldProps('img')} // Подключение Formik
                                 />
                              </div>

                              {formik.touched.img && formik.errors.img && (
                                 <ErrorMessage>
                                    {formik.errors.img}
                                 </ErrorMessage>
                              )}
                           </div>
                        </ContainerInputs>
                        <ContainerButtons>
                           <ModalButton onClick={() => setShowBoard(false)}>
                              Cancel
                           </ModalButton>
                           <ModalButton>Update</ModalButton>
                        </ContainerButtons>
                     </form>
                  </ModalUi>
               ) : (
                  <TitleBox onClick={clickEditHandler}>
                     <EditIcon />

                     <TitleText>{boardById?.title}</TitleText>
                  </TitleBox>
               )}

               <div>
                  <span>Columns:</span>
                  <CountSpan>24</CountSpan>
               </div>
            </div>
            <FilterCont>
               <Avatars />
               <InviteBox onClick={openModalHandler}>
                  <InviteText>Invite</InviteText>
                  <FrameIcon />
               </InviteBox>
               <StarFilter />
               <Filter
                  openFilterModal={openFilterModal}
                  openFilterModalHandler={openFilterModalHandler}
                  closeFilterModalHandler={closeFilterModalHandler}
                  setOpenFilterModal={setOpenFilterModal}
               />
               <Menu
                  open={open}
                  setOpen={setOpen}
                  setOpenFilterModal={setOpenFilterModal}
               />
            </FilterCont>
         </LayoutMenuContainer>
         {openModal && (
            <ModalUi open={openModal} onClose={openModalHandler}>
               <div>
                  <Participant
                     openNewInvite={openNewInvite}
                     openModalHandler={openModalHandler}
                     setOpenNewInvite={setOpenNewInvite}
                  />
               </div>
            </ModalUi>
         )}
      </>
   )
}

const LayoutMenuContainer = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   marginTop: '6rem',
   width: '82vw',
})

const ModalButton = styled(Button)(() => ({
   '&:hover': {
      backgroundColor: '#005688;',
   },
   '&:active': {
      backgroundColor: ' #57AEE0;',
   },

   width: '5.6rem',
   height: '2.125rem',
   fontSize: '0.875rem',
   fontWeight: '400',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const ContainerButtons = styled('div')({
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '0.5rem',
})

const InputStyled = styled(TextField)(() => ({
   '& .MuiOutlinedInput-input': {
      borderRadius: '0.5rem',
      width: '19.8rem',
      padding: '0.575rem 1rem',
      backgroundColor: '#fff',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
      },
      '&:hover fieldset': {
         border: '1px solid #D0D0D0',
      },
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ' #D0D0D0',
   },
   '& .css-1qi90xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
   },
}))

const ContainerInputs = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: '10.2rem',
   padding: '0.5rem',
   gap: '0.6rem',
   '.block-input': {
      height: '4.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      div: {
         display: 'flex',
         flexDirection: 'column',
      },
   },
}))

const FilterCont = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginRight: '3rem',
   gap: '1rem',
})

const TitleBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
   cursor: 'pointer',
})

const TitleText = styled('p')({
   fontWeight: 'bold',
})

const InviteBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '5rem',
   gap: '0.5rem',
   cursor: 'pointer',
})

const InviteText = styled('p')({
   color: '#2f1fe6',
})

const CountSpan = styled('span')({
   padding: '0.1rem 0.3125rem',
   borderRadius: '1rem',
   background: '#B2B2B2',
   color: '#FFFFFF',
   fontSize: '0.875rem',
})

const ErrorMessage = styled('p')({
   color: 'red',
   fontSize: '0.75rem',
   // marginTop: '0.25rem',
})
