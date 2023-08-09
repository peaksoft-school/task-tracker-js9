import { styled } from '@mui/material'
import React from 'react'
import { ModalUi } from '../UI/modal/Modal'
// import { DoneIcon } from '../../assets/icons'

export const BoardModal = ({
   BoardColors,
   // background,
   toggleModal,
   postFunc,
}) => {
   // const [selectedColor, setSelectedColor] = React.useState(null)
   // const editColor = (id) => {
   //    setSelectedColor(id === selectedColor ? null : id)
   // }
   const postAddBack = (color, name) => {
      postFunc({
         backGround: color,
         title: name,
         workSpaceId: 2,
      })
   }

   return (
      <ModalUi open={toggleModal} onClose={toggleModal}>
         <Container>
            <BoardTitle>Create new board</BoardTitle>
            <BoardInput placeholder="Board title*" />
            <ColorTitle>Add background</ColorTitle>
            <ColorContainer>
               <TitleWrapper>
                  <PhotoTitle>Photo</PhotoTitle>
                  <PhotoLink>See more</PhotoLink>
               </TitleWrapper>
               <Photo>
                  {BoardColors.map(
                     (item) =>
                        item.background.slice(0, 1) !== '#' && (
                           <Img
                              onClick={() =>
                                 postAddBack(
                                    item.background,
                                    item.title,
                                    item.isFavourite
                                 )
                              }
                              src={item.background}
                              alt=""
                           />
                        )
                  )}
               </Photo>
               <TitleWrapper>
                  <PhotoTitle>Colors</PhotoTitle>
                  <PhotoLink>See more</PhotoLink>
               </TitleWrapper>
               <Colors>
                  {BoardColors.map(
                     (item) =>
                        item.background.slice(0, 1) === '#' && (
                           <Color
                              onClick={() =>
                                 postAddBack(
                                    item.background,
                                    item.title,
                                    item.isFavourite
                                 )
                              }
                              style={{
                                 background: item.background,
                              }}
                           >
                              {/* {selectedColor === item.id && <DoneIcon />} */}
                           </Color>
                        )
                  )}
               </Colors>
            </ColorContainer>
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

const ColorContainer = styled('div')(() => ({
   paddingTop: '16px',
}))

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
}))

const TitleWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '8px 0',
}))

const PhotoTitle = styled('h5')(() => ({
   fontSize: '0.9rem',
   fontWeight: 400,
   color: '#919191',
}))
const Colors = styled('div')(() => ({
   display: 'flex',
}))

const Img = styled('img')(() => ({
   width: '135px',
   height: '62px',
   borderRadius: '8px',
   '&:not(:last-child)': {
      marginRight: '16px',
   },
}))

const Color = styled('div')(() => ({
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
