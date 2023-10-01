import React, { useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DownIcon, UpIcon } from '../../assets/icons'

import {
   attachmentRemove,
   attachmentGet,
   attachmentPhotoPost,
} from '../../store/card/cardThunk'
import ModalPage from './ModalPage'

export const Attachment = ({ downState, onClickDown }) => {
   const dispatch = useDispatch()
   const { carId } = useParams()

   const [openImageModal, setOpenImageModal] = useState(false)
   const [selectedImage, setSelectedImage] = useState(null)
   const images = useSelector((state) => state.card.images)

   const openImageModalHandler = (image) => {
      setOpenImageModal(!openImageModal)
      setSelectedImage(image)
   }
   const onDrop = React.useCallback(async (acceptedFiles) => {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('file', file)
      dispatch(attachmentPhotoPost({ obj: formData, id: carId }))
   }, [])
   const { getRootProps, getInputProps } = useDropzone({ onDrop })
   const deleteImg = (id) => {
      dispatch(attachmentRemove(id))
   }

   React.useEffect(() => {
      dispatch(attachmentGet(carId))
   }, [onDrop])

   return (
      <Container>
         <ContainerInner>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               {downState ? (
                  <UpIcon onClick={onClickDown} />
               ) : (
                  <DownIcon onClick={onClickDown} />
               )}
               <Title>Attachment</Title>
            </div>
         </ContainerInner>
         {!downState && (
            <Section>
               {images?.length > 0 ? (
                  images?.map((image) => (
                     <SectionContainer key={image.attachmentId}>
                        <div
                           style={{ display: 'flex', alignItems: 'flex-end' }}
                        >
                           <Img
                              onClick={() => openImageModalHandler(image)}
                              src={image.documentLink}
                              alt=""
                           />

                           <TextContainer>
                              <PhotoName>
                                 {image.documentLink
                                    .split('/')
                                    .pop()
                                    .split('/')
                                    .pop()}
                              </PhotoName>
                              <DateText>{image.createdAt}</DateText>
                           </TextContainer>
                           <Button
                              onClick={() => deleteImg(image.attachmentId)}
                              style={{ cursor: 'pointer' }}
                           >
                              Delete
                           </Button>
                        </div>
                     </SectionContainer>
                  ))
               ) : (
                  <EmptyText>No attachments available</EmptyText>
               )}
            </Section>
         )}
         <div
            style={{
               display: 'flex',
               justifyContent: 'flex-end',
            }}
         >
            <div {...getRootProps()}>
               <input {...getInputProps()} />
               <AddButton>Add an attachment</AddButton>
            </div>
         </div>
         {openImageModal && selectedImage && (
            <ModalPage
               selectedImage={openImageModalHandler}
               open={openImageModal}
               image={selectedImage}
            />
         )}
      </Container>
   )
}

const Container = styled('div')(() => ({
   maxWidth: '670px',
   margin: '0 auto',
}))
const ContainerInner = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '1rem',
}))
const Title = styled('h4')(() => ({
   color: '#111',
   marginLeft: '8px',
   // fontWeight: 400,
}))
const SectionContainer = styled('div')(() => ({
   position: 'relative',
   display: 'flex',
   alignItems: 'flex-end',
   justifyContent: 'space-between',
   '&:not(:last-child)': {
      marginBottom: '0.5rem',
   },
   '&:last-child': {
      marginBottom: '0.62rem',
   },
}))
const TextContainer = styled('div')(() => ({
   margin: '20px 0',
}))
const PhotoName = styled('div')(() => ({
   color: '#111',
   fintSize: '0.875rem',
   fontWeight: '400',
   width: '500px',
}))
const DateText = styled('div')(() => ({
   fontSize: '0.75rem',
   fontWeight: 400,
   color: '#919191',
}))
const Button = styled('div')(() => ({
   color: '#919191',
   fontWeight: 400,
   borderBottom: '1px solid #919191',
   position: 'absolute',
   left: '38.9rem',
}))
const Img = styled('img')(() => ({
   width: '153px',
   height: '75px',
   objectFit: 'cover',
   borderRadius: '8px',
   marginRight: '0.63rem',
}))

// const AddButton = styled('input')(() => ({
//    display: 'none',
// }))
const Section = styled('div')(() => ({}))
const AddButton = styled('div')(() => ({
   color: '#fff',
   fontSize: '0.875rem',
   padding: '6px 20px',
   backgroundColor: '#0079BF',
   borderRadius: '24px',
   cursor: 'pointer',
}))

const EmptyText = styled('div')(() => ({
   color: '#919191',
   textAlign: 'center',
   fontSize: '1rem',
   margin: '20px',
}))
