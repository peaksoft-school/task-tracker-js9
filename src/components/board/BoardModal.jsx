import { styled } from '@mui/material'
import React from 'react'
import { ModalUi } from '../UI/modal/Modal'
import { Photos } from '../photoColor/Photo'
import { Colors } from '../photoColor/Color'

export const BoardModal = ({ BoardColors, toggleModal, postFunc }) => {
   const [backGround, setPostColor] = React.useState()
   const [title, setPostTitle] = React.useState()
   const [openPhoto, setOpenPhoto] = React.useState(false)
   const [openColor, setOpenColor] = React.useState(false)
   const postAddBack = () => {
      postFunc({ backGround, title, workSpaceId: 42 })
      toggleModal()
   }

   const titleChange = (event) => {
      setPostTitle(event.target.value)
   }

   const togglePhoto = () => {
      setOpenPhoto((prev) => !prev)
   }

   const toggleColor = () => {
      setOpenColor((prev) => !prev)
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
                  {openPhoto ? <PhotosModal togglePhoto={togglePhoto} /> : null}
               </TitleWrapper>
               <Photo>
                  {BoardColors.filter(
                     (boardColor) => boardColor.background.slice(0, 1) !== '#'
                  )
                     .slice(0, 3)
                     .map((boardColor) => (
                        <Img
                           onClick={() => setPostColor(boardColor.background)}
                           src={boardColor.background}
                           alt=""
                        />
                     ))}
               </Photo>
               <TitleWrapper>
                  <PhotoTitle>Colors</PhotoTitle>
                  <PhotoLink onClick={toggleColor}>See more</PhotoLink>
                  {openColor ? (
                     <Colors
                        setPostColor={setPostColor}
                        toggleColor={toggleColor}
                     />
                  ) : null}
               </TitleWrapper>
               <Color>
                  {BoardColors.filter((boardColor) => boardColor)
                     .slice(0, 6)
                     .map(
                        (boardColor) =>
                           boardColor.background.slice(0, 1) === '#' && (
                              <Colour
                                 onClick={() =>
                                    setPostColor(boardColor.background)
                                 }
                                 style={{
                                    background: boardColor.background,
                                 }}
                              />
                           )
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
   position: 'relative',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px 0',
}))

const PhotoTitle = styled('h5')(() => ({
   fontSize: '0.9rem',
   fontWeight: 400,
   color: '#919191',
}))
const Color = styled('div')(() => ({
   display: 'flex',
}))

const Img = styled('img')(() => ({
   width: '135px',
   height: '62px',
   borderRadius: '8px',
   '&:not(:last-child)': {
      marginRight: '16px',
   },

   '&:hover': {
      border: '1px solid #000',
   },
}))

const Colour = styled('div')(() => ({
   width: '59px',
   height: '31px',
   borderRadius: '8px',
   '&:not(:last-child)': {
      marginRight: '16px',
   },
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
