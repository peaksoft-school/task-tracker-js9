import React, { useState } from 'react'
import { styled, IconButton } from '@mui/material'
import { StarFilledIcon, StarIcon } from '../../assets/icons'

export const Favourite = ({ favourite }) => {
   const [open, setOpen] = useState(favourite.map(() => false))

   const handleStarClick = (index) => {
      setOpen((prevOpen) => {
         const newOpen = [...prevOpen]
         newOpen[index] = !newOpen[index]
         return newOpen
      })
   }

   return (
      <Container>
         <FavouriteText>Favourites</FavouriteText>
         {favourite.map((item, index) => (
            <FavouriteBox key={item.id}>
               {item.image && (
                  <ImageContainer>
                     <StyledImage src={item.image} alt="favourites" />
                  </ImageContainer>
               )}
               <TextContainer marginLeft={index === 2 ? '0rem' : '1rem'}>
                  <div>
                     <p className="title-p">{item.title}</p>
                     <p className="text-p">{item.text}</p>
                  </div>
               </TextContainer>
               <IconButton onClick={() => handleStarClick(index)}>
                  {open[index] ? <StarFilledIcon /> : <StarIcon />}
               </IconButton>
            </FavouriteBox>
         ))}
      </Container>
   )
}

const Container = styled('div')({
   width: '23.0625rem',
   height: '28.875rem',
   borderRadius: '0.625rem',
   padding: '1rem',
})

const ImageContainer = styled('div')({
   flex: '0 0 auto',
})

const StyledImage = styled('img')({
   width: '5.25rem',
   height: '2.475rem',
   borderRadius: '0.5rem',
})

const FavouriteBox = styled('div')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom: '1rem',
})

const TextContainer = styled('div')(({ marginLeft }) => ({
   flex: 1,
   marginLeft,
   '.title-p': {
      color: '#000',
      fontFamily: 'CarePro',
      fontSize: '1rem',
      fontWeight: '400',
   },
   '.text-p': {
      color: '#919191',
      fontFamily: 'CarePro',
      fontSize: '0.875rem',
      fontWeight: '400',
   },
}))

const FavouriteText = styled('p')({
   color: '#000',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '400',
   display: 'flex',
   justifyContent: 'center',
   marginBottom: '1rem',
})
