import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { styled, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StarFilledIcon, StarIcon } from '../../assets/icons'
import {
   getFavourites,
   toggleFavoriteaBoard,
} from '../../store/getFavourites/favouritesThunk'

export const Favourite = ({ openCloseModalHandler }) => {
   const { favoriteData } = useSelector((state) => state.favorite)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const handleStarClickWorkSpace = () => {
      navigate('/mainPage')
   }

   const deleteHandler = async (id) => {
      try {
         await dispatch(toggleFavoriteaBoard(id))
         await dispatch(getFavourites())

         openCloseModalHandler(true)

         navigate('/mainPage')
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      dispatch(getFavourites())
   }, [dispatch])

   const getIcon = (isFavourite) =>
      isFavourite ? <StarFilledIcon /> : <StarIcon />

   return (
      <Container>
         <FavouriteText>Favourites</FavouriteText>
         {favoriteData.data?.boardResponses?.map((item) => (
            <FavouriteBox key={item.boardId} hoverColor="#F2F2F2">
               {item.backGround && item.backGround.startsWith('https') ? (
                  <ImageContainer>
                     <StyledImage src={item.backGround} alt="#" />
                  </ImageContainer>
               ) : (
                  <ColoredBackground color={item.backGround} />
               )}
               <TextContainer>
                  <div>
                     <StyledTitle>{item.title}</StyledTitle>
                  </div>
               </TextContainer>
               <IconButton onClick={() => deleteHandler(item.boardId)}>
                  {getIcon(item.favorite)}
               </IconButton>
            </FavouriteBox>
         ))}

         {favoriteData.data?.workSpaceResponses?.map((item) => (
            <FavouriteBox key={item.W} hoverColor="#F2F2F2">
               <TextContainer>
                  <div>
                     <StyledTitle>{item.name}</StyledTitle>
                     <StyledText>Workcpase</StyledText>
                  </div>
               </TextContainer>
               <IconButton onClick={handleStarClickWorkSpace}>
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
   maxHeight: '100%',
   overflow: 'auto',
   '&::-webkit-scrollbar': {
      width: 4,
   },
})
const ColoredBackground = styled('div')(({ color }) => ({
   backgroundColor: color,
   width: '5.25rem',
   height: '2.475rem',
   borderRadius: '0.5rem',
}))

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
