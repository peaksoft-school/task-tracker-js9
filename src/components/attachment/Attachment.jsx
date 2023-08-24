import React from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { DeleteIcon, DownIcon, UpIcon } from '../../assets/icons'

import Photo from '../../assets/images/ImageInLogoPage.png'
import { AttachmentPos, AttachmentRemove } from '../../store/card/cardThunk'

export const Attachment = () => {
   const dispatch = useDispatch()
   const [selectedImage, setSelectedImage] = React.useState([])
   const [selectedImageName, setSelectedImageName] = React.useState('')
   const [downState, setDownSate] = React.useState(false)

   const onDrop = React.useCallback((acceptedFiles) => {
      const file = acceptedFiles[0]
      setSelectedImageName(file.name)

      if (file) {
         const reader = new FileReader()
         reader.onload = () => {
            console.log()
            setSelectedImage(reader.result)
            dispatch(
               AttachmentPos({
                  documentLink:
                     'https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                  cardId: 59,
               })
            )
         }
         reader.readAsDataURL(file)
      }
   }, [])
   const { getRootProps, getInputProps } = useDropzone({ onDrop })
   const deleteImg = (id) => {
      dispatch(AttachmentRemove(id))
   }

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <DeleteIcon />
               <DeleteTitle>Delete</DeleteTitle>
            </div>
         </ContainerInner>
         {!downState && (
            <Section>
               <SectionContainer>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <Img src={Photo} alt="" />
                     <TextContainer>
                        <PhotoName>title.pdf</PhotoName>
                        <Date>12 Sep, 2021 / 6:30 PM</Date>
                     </TextContainer>
                  </div>
                  <Button>Delete</Button>
               </SectionContainer>
               <SectionContainer>
                  <div style={{ display: 'flex' }}>
                     <Img src={selectedImage} alt="" />
                     <TextContainer>
                        <PhotoName>{selectedImageName}</PhotoName>
                        <Date>12 Sep, 2021 / 6:30 PM</Date>
                     </TextContainer>
                  </div>
                  <Button onClick={(id) => deleteImg(id)}>Delete</Button>
               </SectionContainer>
            </Section>
         )}
         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
const TextContainer = styled('div')(() => ({}))
const PhotoName = styled('div')(() => ({
   color: '#111',
   fintSize: '0.875rem',
   fontWeight: '400',
   width: '500px',
}))
const Date = styled('div')(() => ({
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
