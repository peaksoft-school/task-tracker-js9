import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { styled, IconButton } from '@mui/material'
import { StarFilledIcon, StarIcon } from '../../assets/icons'
import {
   getFavourites,
   toggleFavoriteWorkSpace,
   toggleFavoriteaBoard,
} from '../../store/getFavourites/favouritesThunk'

export const Favourite = () => {
   const { favoriteData } = useSelector((state) => state.favorite)
   console.log('favoriteData', favoriteData)

   const dispatch = useDispatch()

   const handleStarClickBoard = (id) => {
      dispatch(toggleFavoriteaBoard(id))
   }

   const handleStarClickWorkSpace = (id) => {
      dispatch(toggleFavoriteWorkSpace(id))
   }

   const getIcon = (isFavourite) =>
      isFavourite ? <StarFilledIcon /> : <StarIcon />

   useEffect(() => {
      dispatch(getFavourites())
   }, [dispatch])

   return (
      <Container>
         <FavouriteText>Favourites</FavouriteText>
         {favoriteData?.boardResponses?.map((item) => (
            <FavouriteBox
               onClick={() => handleStarClickBoard(item.boardId)}
               key={item.boardId}
               hoverColor="#F2F2F2"
            >
               {item.backGround && (
                  <ImageContainer>
                     <StyledImage src={item.backGround} alt="#" />
                  </ImageContainer>
               )}
               <TextContainer>
                  <div>
                     <StyledTitle>{item.title}</StyledTitle>
                     {/* <StyledText>{item.text}</StyledText> */}
                  </div>
               </TextContainer>
               <IconButton onClick={() => handleStarClickBoard(item.boardId)}>
                  {getIcon(item.favorite)}
               </IconButton>
            </FavouriteBox>
         ))}
         {favoriteData.workSpaceResponses?.map((item) => (
            <FavouriteBox
               onClick={() => handleStarClickWorkSpace(item.workSpaceId)}
               key={item.W}
               hoverColor="#F2F2F2"
            >
               <TextContainer>
                  <div>
                     <StyledTitle>{item.name}</StyledTitle>
                     <StyledText>Workcpase</StyledText>
                  </div>
               </TextContainer>
               <IconButton
                  onClick={() => handleStarClickWorkSpace(item.workSpaceId)}
               >
                  {getIcon(item.favorite)}
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
