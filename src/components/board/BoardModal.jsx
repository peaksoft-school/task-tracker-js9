import { styled } from '@mui/material'
import React from 'react'
import { ModalUi } from '../UI/modal/Modal'
import { Photos } from '../photoColor/Photo'
import { Colors } from '../photoColor/Color'
import { DoneIcon } from '../../assets/icons'

export const BoardModal = ({ BoardColors, toggleModal, postFunc }) => {
   const [backGround, setPostColor] = React.useState()
   const [title, setPostTitle] = React.useState()
   const [openPhoto, setOpenPhoto] = React.useState(false)
   const [openColor, setOpenColor] = React.useState(false)
   const [selectedColor, setSelectedColor] = React.useState(null)
   const [selectedPhoto, setSelectedPhoto] = React.useState(null)
   const postAddBack = () => {
      postFunc({ backGround, title, workSpaceId: 79 })
      toggleModal()
      console.log(backGround)
   }

   const titleChange = (event) => {
      setPostTitle(event.target.value)
   }

   const togglePhoto = () => {
      setOpenPhoto((prev) => !prev)
      setOpenColor(false)
   }

   const toggleColor = () => {
      setOpenColor((prev) => !prev)
      setOpenPhoto(false)
   }

   const editColor = (boardColor) => {
      setSelectedColor(boardColor.id === selectedColor ? null : boardColor.id)
      setPostColor(boardColor.background)
   }
   const editPhoto = (boardColor) => {
      setSelectedPhoto(boardColor.id === selectedPhoto ? null : boardColor.id)
      setPostColor(boardColor.background)
   }

   return (
      <ModalUi open={toggleModal} onClose={toggleModal}>
         <Container>
            <BoardTitle>Create new board</BoardTitle>
            <BoardInput placeholder="Board title*" onChange={titleChange} />
            <ColorTitle>Add background</ColorTitle>
            <ColorContainer>
               <TitleWrapper>
                  <PhotoTitle>Photo</PhotoTitle>
                  <PhotoLink onClick={togglePhoto}>See more</PhotoLink>
                  {openPhoto ? (
                     <PhotosModal
                        editPhoto={editPhoto}
                        togglePhoto={togglePhoto}
                        selectedPhoto={selectedPhoto}
                     />
                  ) : null}
               </TitleWrapper>
               <Photo>
                  {BoardColors.filter(
                     (boardColor) => boardColor.background.slice(0, 1) !== '#'
                  )
                     .slice(0, 3)
                     .map((boardColor) => (
                        <div
                           key={boardColor.id}
                           style={{
                              position: 'relative',
                              marginRight: '16px',
                              '&:not(:last-child)': {
                                 marginRight: '16px',
                              },
                           }}
                        >
                           <Img
                              onClick={() => editPhoto(boardColor)}
                              src={boardColor.background}
                              alt=""
                           />
                           {selectedPhoto === boardColor.id && (
                              <div
                                 style={{
                                    position: 'absolute',
                                    top: '46%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '135px',
                                    height: '60px',
                                    borderRadius: '8px',
                                    background: 'rgba(0,0,0, 0.4)',
                                 }}
                              >
                                 <Choose
                                    style={{
                                       position: 'absolute',
                                       top: '50%',
                                       left: '50%',
                                       width: '40px',
                                       height: '40px',
                                       transform: 'translate(-50%, -50%)',
                                    }}
                                 />
                              </div>
                           )}
                        </div>
                     ))}
               </Photo>
               <TitleWrapper>
                  <PhotoTitle>Colors</PhotoTitle>
                  <PhotoLink onClick={toggleColor}>See more</PhotoLink>
                  {openColor ? (
                     <Colors
                        editColor={editColor}
                        toggleColor={toggleColor}
                        selectedColor={selectedColor}
                     />
                  ) : null}
               </TitleWrapper>
               <Color>
                  {BoardColors.filter((boardColor) => boardColor)
                     .slice(0, 6)
                     .map((boardColor) =>
                        boardColor.background.slice(0, 1) === '#' ? (
                           <div
                              key={boardColor.id}
                              style={{
                                 position: 'relative',
                                 marginRight: '16px',
                                 '&:not(:last-child)': {
                                    marginRight: '16px',
                                 },
                              }}
                           >
                              <Colour
                                 onClick={() => editColor(boardColor)}
                                 style={{
                                    background: boardColor.background,
                                 }}
                              />
                              {selectedColor === boardColor.id && (
                                 <div
                                    style={{
                                       position: 'absolute',
                                       top: '50%',
                                       left: '50%',
                                       transform: 'translate(-50%, -50%)',
                                       width: '59px',
                                       height: '31px',
                                       borderRadius: '8px',
                                       background: 'rgba(0,0,0, 0.4)',
                                    }}
                                 >
                                    <Choose
                                       fill="#FFFFFF"
                                       style={{
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)',
                                          width: '25px',
                                          height: '25px',
                                       }}
                                    />
                                 </div>
                              )}
                           </div>
                        ) : null
                     )}
               </Color>
            </ColorContainer>
            <ButtonContainer>
               <ButtonCancel onClick={toggleModal}>Cancel</ButtonCancel>
               <ButtonCreate onClick={postAddBack}>Create board</ButtonCreate>
            </ButtonContainer>
         </Container>
      </ModalUi>
   )
}

const Container = styled('div')(() => ({
   width: '437px',
   height: '323px',
   //  padding: '16px 20px',
   borderRight: '10px',
}))

const BoardTitle = styled('h4')(() => ({
   textAlign: 'center',
   paddingBottom: '20px',
}))
const BoardInput = styled('input')(() => ({
   padding: '6px 0 6px 16px',
   border: '1px solid #AFAFAF',
   borderRadius: '8px',
   width: '100%',
   '&::placeholder': {
      color: '#919191',
   },
}))

const ColorContainer = styled('div')(() => ({}))

const ColorTitle = styled('h4')(() => ({
   paddingTop: '16px',
   color: '#919191',
   fontWeight: 400,
}))

const Photo = styled('div')(() => ({
   display: 'flex',
}))

const PhotoLink = styled('a')(() => ({
   color: '#919191',
   fontSize: '0.9rem',
   fontWeight: 400,
   borderBottom: '1px solid #919191',
   cursor: 'pointer',
}))

const TitleWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px 0',
   position: 'relative',
}))

const PhotoTitle = styled('h5')(() => ({
   fontSize: '0.9rem',
   fontWeight: 400,
   color: '#919191',
}))
const Color = styled('div')(() => ({
   display: 'flex',
   position: 'relative',
}))

const Img = styled('img')(() => ({
   width: '135px',
   height: '62px',
   borderRadius: '8px',

   '&:hover': {
      border: '1px solid #000',
   },
}))

const Colour = styled('div')(() => ({
   width: '59px',
   height: '31px',
   borderRadius: '8px',
   '&:hover': {
      border: '1px solid #000',
   },
}))

const ButtonContainer = styled('div')(() => ({
   marginTop: '24px',
   textAlign: 'end',
   fontSize: '0.9rem',
   fontWeight: 400,
}))
const ButtonCancel = styled('button')(() => ({
   color: '#919191',
   borderRadius: '24px',
   border: 'none',
   padding: '8px 16px',
   marginRight: '16px',
}))
const ButtonCreate = styled('button')(() => ({
   color: '#fff',
   borderRadius: '24px',
   border: 'none',
   padding: '8px 16px',
   backgroundColor: '#0079BF',
}))

const PhotosModal = styled(Photos)(() => ({}))
const Choose = styled(DoneIcon)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '25px',
   height: '25px',
}))
