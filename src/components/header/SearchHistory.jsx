import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'

export const SearchHistory = () => {
   const searchHistory = useSelector((state) => state.search.searchHistory)
   const searchHistoryWorkspace = useSelector(
      (state) => state.search.searchHistoryWorkspace
   )
   const searchHistoryUser = useSelector(
      (state) => state.search.searchHistoryUser
   )
   const navigate = useNavigate()

   const navigateToBoardDetail = (boardId) => {
      navigate(`/mainPage/:id/boards/${boardId}/board`)
   }

   const navigateToWorkspaceDetail = (workspaceId) => {
      navigate(`/mainPage/${workspaceId}/boards/`)
   }

   return (
      <Container>
         {searchHistory?.map((item) => (
            <WrapperBoard
               key={item.boardId}
               onClick={() => navigateToBoardDetail(item.boardId)}
               style={{ display: 'flex', alignItems: 'center' }}
            >
               {item.backGround?.startsWith('#') ? (
                  <ColorBlock color={item?.backGround} />
               ) : (
                  <ImageStyled src={item?.backGround} alt="Board photo" />
               )}
               <p>{item?.title}</p>
            </WrapperBoard>
         ))}

         {searchHistoryWorkspace?.map((item) => (
            <WorkspaceWrapper
               key={item?.workSpaceId}
               onClick={() => navigateToWorkspaceDetail(item?.workSpaceId)}
            >
               <StyledTitle>{item.workSpaceName}</StyledTitle>
               <StyledText>Workspace</StyledText>
            </WorkspaceWrapper>
         ))}
         {searchHistoryUser?.map((item) => (
            <WrapperUsers
               key={item.userId}
               onClick={() => {
                  navigate(`/profile/${item.userId}`, {
                     state: { edit: 'true' },
                  })
               }}
            >
               <ProfieStyle src={item.avatar} alt="User photo" />
               <p>{item.firstName}</p>
               <p>{item.lastName}</p>
            </WrapperUsers>
         ))}
      </Container>
   )
}

const Container = styled('div')(() => ({
   boxShadow: ' 18px 33px 26px -12px rgba(34, 60, 80, 0.2)',

   width: '31rem',
   backgroundColor: '#fff',
   position: 'absolute',
   padding: '20px',
   maxHeight: '250px',
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   overflowY: 'auto',
   marginLeft: '0.5rem',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #D9D9D9 transparent',
   borderBottomLeftRadius: '0.5rem',
   borderBottomRightRadius: '0.5rem',
   '&::-webkit-scrollbar': {
      width: '0.5rem',
   },
   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },
   '&::-webkit-scrollbar-thumb': {
      backgroundColor: ' #D9D9D9',
      borderRadius: '0.25rem',
   },
}))

const WrapperBoard = styled('div')(() => ({
   width: '100%',
   height: '50px',
   display: 'flex',
   gap: '10px',
   cursor: 'pointer',
}))

const ImageStyled = styled('img')(() => ({
   width: '60px',
   height: '40px',
   borderRadius: '10px',
}))

const ColorBlock = styled('div')(({ color }) => ({
   width: '60px',
   height: '40px',
   borderRadius: '10px',
   backgroundColor: color,
}))

const WorkspaceWrapper = styled('div')(() => ({
   width: '100%',
   cursor: 'pointer',
}))

const StyledText = styled('p')({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontWeight: '400',
   marginLeft: '0.5rem',
})

const StyledTitle = styled('p')({
   color: '#000',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontWeight: '400',
   marginLeft: '0.5rem',
})

const WrapperUsers = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   cursor: 'pointer',
}))

const ProfieStyle = styled('img')(() => ({
   width: '50px',
   height: '50px',
   borderRadius: '50%',
}))
