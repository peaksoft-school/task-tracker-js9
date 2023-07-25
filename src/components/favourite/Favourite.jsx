import React, { useState } from 'react'
import { styled, IconButton } from '@mui/material'
import { StarFilledIcon, StarIcon } from '../../assets/icons'

export const Favourite = ({ favourite }) => {
   const [favouriteData, setFavouriteData] = useState(favourite)

   const handleStarClick = (id) => {
      setFavouriteData((prevData) =>
         prevData.map((item) =>
            item.id === id ? { ...item, favourite: !item.favourite } : item
         )
      )
   }

   const getIcon = (isFavourite) =>
      isFavourite ? <StarFilledIcon /> : <StarIcon />

   const returnIdHandler = (id) => {
      console.log('Clicked item ID:', id)
   }

   return (
      <Container>
         <FavouriteText>Favourites</FavouriteText>
         {favouriteData.length === 0 ? (
            <p>Favourite empty</p>
         ) : (
            favouriteData.map((item) => (
               <FavouriteBox
                  onClick={() => returnIdHandler(item.id)}
                  key={item.id}
                  hoverColor="#F2F2F2"
               >
                  {item.image && (
                     <ImageContainer>
                        <StyledImage src={item.image} alt="favourites" />
                     </ImageContainer>
                  )}
                  <TextContainer>
                     <div>
                        <StyledTitle>{item.title}</StyledTitle>
                        <StyledText>{item.text}</StyledText>
                     </div>
                  </TextContainer>
                  <IconButton onClick={() => handleStarClick(item.id)}>
                     {getIcon(item.favourite)}
                  </IconButton>
               </FavouriteBox>
            ))
         )}
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

const FavouriteBox = styled('div')(({ hoverColor }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom: '1rem',
   '&:hover': {
      backgroundColor: hoverColor || 'transparent',
      cursor: 'pointer',
   },
}))

const TextContainer = styled('div')(() => ({
   flex: 1,
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

const StyledTitle = styled('p')({
   color: '#000',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '400',
   marginLeft: '0.5rem',
})

const StyledText = styled('p')({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontWeight: '400',
   marginLeft: '0.5rem',
})
