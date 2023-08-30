import React from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon, DownIcon, UpIcon } from '../../assets/icons'

import {
   attachmentRemove,
   attachmentGet,
   attachmentPhotoPost,
} from '../../store/card/cardThunk'

export const Attachment = () => {
   const dispatch = useDispatch()

   const [downState, setDownSate] = React.useState(false)

   const images = useSelector((state) => state.card.images)

   const onDrop = React.useCallback(async (acceptedFiles) => {
      const file = acceptedFiles[0]

      const formData = new FormData()
      formData.append('file', file)
      dispatch(attachmentPhotoPost(formData))
   }, [])
   const { getRootProps, getInputProps } = useDropzone({ onDrop })
   const deleteImg = (id) => {
      dispatch(attachmentRemove(id))
   }

   React.useEffect(() => {
      dispatch(attachmentGet())
   }, [onDrop])

   const onClickDown = () => {
      setDownSate((prev) => !prev)
   }

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
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
               }}
            >
               <DeleteIcon />
               <DeleteTitle>Delete</DeleteTitle>
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
                           <Img src={image.documentLink} alt="" />
                           <TextContainer>
                              <PhotoName>
                                 {/* {image.documentLink.substring(
                                    image.documentLink.lastIndexOf('/') + 1
                                 )} */}
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
const Title = styled('h3')(() => ({
   color: '#111',
   marginLeft: '8px',
   fontWeight: 400,
}))
const SectionContainer = styled('div')(() => ({
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
}))
const Img = styled('img')(() => ({
   width: '153px',
   height: '75px',
   objectFit: 'cover',
   borderRadius: '8px',
   marginRight: '0.63rem',
}))
const DeleteTitle = styled('div')(() => ({
   marginLeft: '8px',
   fontWeight: 400,
   color: '#919191',
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
