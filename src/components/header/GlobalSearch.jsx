/* eslint-disable import/named */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, styled } from '@mui/material'
import {
   addToSearchHistory,
   addToSearchHistoryWorkspace,
   addToSearchHistoryUser,
} from '../../store/globalSearch/searchSlice'

export const GlobalSearch = ({ globalSearch }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading } = useSelector((state) => state.search)

   const navigateToBoardDetail = (workspaceId, boardId) => {
      navigate(`/mainPage/${workspaceId}/boards/${boardId}/board`)
   }

   const navigateToWorkspaceDetail = (workspaceId) => {
      navigate(`/mainPage/${workspaceId}/boards/`)
   }

   const handleSearchResultClick = (query) => {
      dispatch(addToSearchHistory(query))
   }
   const handleSearchResultWorkspaceClick = (query) => {
      dispatch(addToSearchHistoryWorkspace(query))
   }
   const handleSearchResultUserClick = (query) => {
      dispatch(addToSearchHistoryUser(query))
   }

   return (
      <div>
         <Container>
            {globalSearch.boardResponses?.map((board) => (
               <WrapperBoard
                  key={board.boardId}
                  onClick={() => {
                     navigateToBoardDetail(board.work_space_id, board.boardId)
                     handleSearchResultClick(board)
                  }}
               >
                  {board.backGround.startsWith('#') ? (
                     <ColorBlock color={board.backGround} />
                  ) : (
                     <ImageStyled src={board.backGround} alt="Board photo" />
                  )}
                  <p>{board.title}</p>
               </WrapperBoard>
            ))}
            {globalSearch.workSpaceResponses?.map((workspaces) => (
               <WorkspaceWrapper
                  key={workspaces.workSpaceId}
                  onClick={() => {
                     navigateToWorkspaceDetail(workspaces.workSpaceId)
                     handleSearchResultWorkspaceClick(workspaces)
                  }}
               >
                  <StyledTitle>{workspaces.workSpaceName}</StyledTitle>
                  <StyledText>Workspace</StyledText>
               </WorkspaceWrapper>
            ))}
            {globalSearch.userResponses?.map((users) => (
               <WrapperUsers
                  key={users.userId}
                  onClick={() => {
                     handleSearchResultUserClick(users)
                     navigate(`/profile/${users.userId}`, {
                        state: { edit: 'true' },
                     })
                  }}
               >
                  <ProfieStyle src={users.avatar} alt="User photo" />
                  <p>{users.firstName}</p>
                  <p>{users.lastName}</p>
               </WrapperUsers>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
               {loading ? (
                  <CircularProgress color="inherit" />
               ) : (
                  <div>
                     {!globalSearch.boardResponses?.length &&
                        !globalSearch.workSpaceResponses?.length &&
                        !globalSearch.userResponses?.length && (
                           <p
                              style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                              }}
                           >
                              No results found :(
                           </p>
                        )}
                  </div>
               )}
            </div>
         </Container>
      </div>
   )
}

const Container = styled('div')(() => ({
   boxShadow: ' 18px 33px 26px -12px rgba(34, 60, 80, 0.2)',
   zIndex: 2,
   width: '31rem',
   backgroundColor: '#fff',
   position: 'absolute',
   padding: '20px',
   maxHeight: '250px',
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   overflowY: 'auto ',
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
