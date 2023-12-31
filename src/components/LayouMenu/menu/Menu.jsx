import { styled, IconButton, keyframes } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ExitIcon, LeftIcon, MenuIcon } from '../../../assets/icons'
// import { MenuItem } from '../../UI/menu/MenuItem'
import { boards } from '../../../utils/constants/general'
import { backgroundImage, backgroundPhoto } from '../../../assets/images'
import { Button } from '../../UI/button/Button'
import { boardRemove, getBoardById } from '../../../store/board/boardThunk'
import { showSnackbar } from '../../UI/snackbar/Snackbar'
import { axiosInstance } from '../../../config/axiosInstance'
import { Archive } from '../../archive/Archive'
// import { ModalUi } from '../../UI/modal/Modal'
import { getArchive } from '../../../store/getArchive/archiveThunk'
import { DeleteBoardModal } from './DeleteBoardModal'

export const Menu = ({ open, setOpen, setOpenFilterModal }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { boardId, id } = useParams()
   const { boardById } = useSelector((state) => state.board)
   const [archive, setArchive] = useState(false)
   const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)

   useEffect(() => {
      dispatch(getBoardById(boardId))
   }, [])

   // const handleModalContentClick = (event) => {
   //    event.stopPropagation()
   // }

   const openArchiveModal = () => {
      setArchive(true)
      setOpen(false)
      dispatch(getArchive(boardId))
   }

   const openMenuHandler = () => {
      setOpen('menu')
      setOpenFilterModal(false)
   }

   const openBackgroundHandler = () => {
      setOpen('background')
   }

   const openPhotosHandler = () => {
      setOpen('photos')
   }

   const openColorsHandler = () => {
      setOpen('colors')
   }

   const closeHandler = () => {
      setOpen('close')
   }

   const photoBoards = boards.filter(
      (board) =>
         board.background.startsWith('https') ||
         board.background.startsWith('http')
   )

   const colorBoards = boards.filter((board) =>
      board.background.startsWith('#')
   )
   const deleteBoardHandler = () => {
      dispatch(boardRemove({ boardId, showSnackbar, navigate, id }))
   }
   const openCloseModalDeleteBoard = () => {
      setShowDeleteBoardModal(!showDeleteBoardModal)
   }

   const handleclick = async (item, board) => {
      try {
         const data = {
            boardI: boardId,
            backGround: item || board,
            title: boardById?.title || '',
         }

         const response = await axiosInstance.put('/api/boards', data)
         showSnackbar({
            message: 'Successfully updated board',
            severity: 'success',
         })
         dispatch(getBoardById(boardId))
         closeHandler()
         return response.data
      } catch (error) {
         showSnackbar({
            message: 'Error ',
            severity: 'error',
         })
         return error
      }
   }
   return (
      <div>
         <StlyedContainerMenu onClick={openMenuHandler}>
            <MenuIcon />
            <MenuPargraph>Menu</MenuPargraph>
         </StlyedContainerMenu>
         {archive && (
            <>
               {/* <ModalUi
                  open={archive}
                  onClose={() => setArchive(false)}
                  handleModalContentClick={handleModalContentClick}
               /> */}
               <BackDropInArchive onClick={() => setArchive(false)} />
               <Archive />
            </>
         )}

         {open === 'menu' && (
            <MenuItemContainer animation="slideIn">
               <Backdrop onClick={closeHandler} />
               <MenuHeader>
                  <p>{}</p>
                  <p>Menu</p>
                  <IconButton onClick={closeHandler}>
                     <ExitIcon fill="gray" />
                  </IconButton>
               </MenuHeader>
               <ChangeDivContainer>
                  <ChangeDiv onClick={openBackgroundHandler}>
                     <ChangeBadkgroundP>
                        Change the background
                     </ChangeBadkgroundP>
                     <ImageStyled
                        src={backgroundPhoto}
                        alt="Background Photo"
                     />
                  </ChangeDiv>

                  <ArchiveCard>
                     <ArchiveButton onClick={openArchiveModal}>
                        In archive
                     </ArchiveButton>
                  </ArchiveCard>

                  {showDeleteBoardModal && (
                     <DeleteBoardModal
                        showDeleteBoardModal={showDeleteBoardModal}
                        openCloseModalDeleteBoard={openCloseModalDeleteBoard}
                        deleteBoardHandler={deleteBoardHandler}
                     />
                  )}
                  <DeleteBox onClick={openCloseModalDeleteBoard}>
                     <DeleteButton>Delete this board</DeleteButton>
                  </DeleteBox>
               </ChangeDivContainer>
            </MenuItemContainer>
         )}
         {open === 'background' && (
            <ChangeBackgroundContainer animation="slideIn">
               <Backdrop onClick={closeHandler} />

               <ChangeBackgroundHeader>
                  <IconButton onClick={openMenuHandler}>
                     <LeftIcon fill="grey" />
                  </IconButton>
                  <p>Change the background</p>
                  <IconButton>
                     <ExitIcon onClick={closeHandler} />
                  </IconButton>
               </ChangeBackgroundHeader>
               <ImageBox>
                  <ImagePhoto
                     onClick={openPhotosHandler}
                     alt=""
                     src={backgroundPhoto}
                  />
                  <ImagePhoto
                     onClick={openColorsHandler}
                     src={backgroundImage}
                     alt=""
                  />
               </ImageBox>
            </ChangeBackgroundContainer>
         )}

         {open === 'photos' && (
            <PopoverCont open={openPhotosHandler}>
               <Backdrop onClick={closeHandler} />

               <AllBoard>
                  <StyledHeader>
                     <StyledIconButton>
                        <StyledLeftIcon onClick={openBackgroundHandler} />
                     </StyledIconButton>
                     <p>Photos</p>
                     <StyledIconButton onClick={closeHandler}>
                        <ExitIcon fill="gray" />
                     </StyledIconButton>
                  </StyledHeader>
                  <PhotoBlocks>
                     {photoBoards.map((board) => (
                        <div key={board.id} style={{ cursor: 'pointer' }}>
                           <Photos
                              src={board.background}
                              alt={`Board ${board.id}`}
                              onClick={() => handleclick(board.background)}
                           />
                        </div>
                     ))}
                  </PhotoBlocks>
               </AllBoard>
            </PopoverCont>
         )}
         {open === 'colors' && (
            <PopoverContColor open={openColorsHandler}>
               <Backdrop onClick={closeHandler} />

               <AllBoardColor>
                  <StyledHeaderColor>
                     <StyledIconButtonColor onClick={openBackgroundHandler}>
                        <StyledLeftIconColor />
                     </StyledIconButtonColor>
                     <p>Colors</p>
                     <StyledIconButtonColor>
                        <ExitIcon onClick={closeHandler} />
                     </StyledIconButtonColor>
                  </StyledHeaderColor>
                  <PhotoBlocksColor>
                     {colorBoards.map((board) => (
                        <div key={board.id} style={{ cursor: 'pointer' }}>
                           <ColorBlock
                              style={{
                                 backgroundColor: board.background,
                              }}
                              alt={`Board ${board.id}`}
                              onClick={() => handleclick(board.background)}
                           />
                        </div>
                     ))}
                  </PhotoBlocksColor>
               </AllBoardColor>
            </PopoverContColor>
         )}
      </div>
   )
}
const Backdrop = styled('div')(() => ({
   width: '100%',
   height: '100%',
   position: 'fixed',
   top: '0',
   left: '0',
   zIndex: -2,
}))
const StlyedContainerMenu = styled('div')({
   width: '6rem',
   height: '2.125rem',
   backgroundColor: '#E9E9E9',
   borderRadius: '1.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.3rem',
   cursor: 'pointer',
})
const ChangeDivContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   flex: '1',
})
const MenuPargraph = styled('p')({
   color: '#438AB4',
})
const MenuHeader = styled('div')({
   display: 'flex',
   marginBottom: '0.6rem',
   justifyContent: 'space-between',
   marginRight: '0.5rem',
})
const ArchiveCard = styled('div')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   '&:hover': {
      backgroundColor: '#f3f0f0',
      cursor: 'pointer',
   },
})
const ArchiveButton = styled(Button)({
   background: 'none',
   color: 'black',
   textTransform: 'capitalize',
   fontFamily: 'CarePro',
   fontSize: '1rem',
})

const DeleteButton = styled(Button)({
   background: 'none',
   color: 'black',
   textTransform: 'capitalize',
   fontFamily: 'CarePro',
   fontSize: '1rem',
})

const ChangeBadkgroundP = styled('p')({
   marginLeft: '1rem',
})
const DeleteBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
   '&:hover': {
      backgroundColor: '#f3f0f0',
      cursor: 'pointer',
   },
})
const ChangeDiv = styled('div')({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   transition: 'background-color 0.3s',
   height: '2.5rem',

   flexGrow: 1,
   '&:hover': {
      backgroundColor: '#f3f0f0',
   },
})

//------
const MenuItemContainer = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }

         break
      default:
         break
   }
   return {
      width: '22.9375rem',
      height: '11.6rem',
      borderRadius: '0.625rem',
      position: 'fixed',
      zIndex: '222',
      right: '2rem',
      top: '5.5rem',
      padding: '0.5rem 0',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'height 0.3s',
      overflow: 'hidden',
      backgroundColor: 'white',

      ...animationStyles,

      '@keyframes slideInAnimation': {
         '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
         },
         '100%': {
            transform: 'translateX(0)',
            opacity: 1,
         },
      },
   }
})

//-------
const ImageStyled = styled('img')({
   width: '3.6875rem',
   height: '1.625rem',
   borderRadius: '0.5rem',
   marginLeft: '6rem',
   cursor: 'pointer',
})
const ChangeBackgroundHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem',
})
const ChangeBackgroundContainer = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }

         break
      default:
         break
   }
   return {
      width: '22.9375rem',
      height: '24vh',
      position: 'fixed',
      right: '2rem',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      zIndex: '999',
      borderRadius: '1rem',
      ...animationStyles,

      '@keyframes slideInAnimation': {
         '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
         },
         '100%': {
            transform: 'translateX(0)',
            opacity: 1,
         },
      },
   }
})
const ImageBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
})
const ImagePhoto = styled('img')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
   cursor: 'pointer',
})
const slideInAnimation = keyframes` 
   0% { 
      transform: translateX(100%); 
      opacity: 0; 
   } 
   100% { 
      transform: translateX(0); 
      opacity: 1; 
   } 
`

const PopoverCont = styled('div')(() => ({
   position: 'fixed',
   zIndex: '22',
   right: '0',
   top: '0',
   minWidth: '23.8rem',
   minHeight: '37rem',
   marginTop: '6rem',
   backgroundColor: '#FFFFFF',
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
   borderRadius: '0.7rem',
   animation: `${slideInAnimation} 0.3s ease-in-out`,
}))
const rotateIcon = keyframes` 
      from { 
      transform: rotate(0); 
    
      } 
      to { 
      transform: rotate(360deg); 
      } 
   `

const StyledIconButton = styled(IconButton)(() => ({
   padding: '0',
   animation: `${rotateIcon} 0.8s linear`,
}))
const StyledLeftIcon = styled(LeftIcon)`
   height: 1.15rem;
   path {
      stroke: #919191;
   }
`
const AllBoard = styled('div')(() => ({
   width: '22.9375rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '10px',
   padding: '0 1rem',
   height: '100%',
   borderRadius: '0.625rem',
   marginTop: '1rem',
   backgroundColor: '#fff',
}))

const StyledHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   padding: '0 1rem',
   marginBottom: '1rem',
})

const PhotoBlocks = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const Photos = styled('img')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
})

const PopoverContColor = styled('div')(() => ({
   position: 'fixed',
   right: '0',
   minWidth: '23.8rem',
   minHeight: '30rem',
   backgroundColor: '#FFFFFF',
   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
   borderRadius: '0.7rem   ',
   animation: `${slideInAnimation} 0.3s ease-in-out`,
   zIndex: 2,
}))

const StyledIconButtonColor = styled(IconButton)(() => ({
   padding: '0',
   animation: `${rotateIcon} 0.8s linear`,
}))
const StyledLeftIconColor = styled(LeftIcon)`
   height: 1.15rem;
   path {
      stroke: #919191;
   }
`
const AllBoardColor = styled('div')(() => ({
   width: '22.9375rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '10px',
   padding: '0 1rem',
   height: '100%',
   borderRadius: '0.625rem',
   marginTop: '1rem',
   backgroundColor: '#fff',
}))

const StyledHeaderColor = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   padding: '0 1rem',
   marginBottom: '1rem',
})

const PhotoBlocksColor = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   flexWrap: 'wrap',
}))

const ColorBlock = styled('div')({
   width: '10rem',
   height: '5rem',
   borderRadius: '0.5rem',
   backgroundColor: 'inherit',
})

const BackDropInArchive = styled('div')({
   width: '100%',
   height: '100%',
   position: 'fixed',
   top: '0',
   left: '0',
})
