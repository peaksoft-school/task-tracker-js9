import { styled, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { StarBlue, StarFilledIcon } from '../../../assets/icons'
import { addFavorite } from '../../../store/board/boardThunk'

export const StarFilter = () => {
   const { id } = useParams()
   const { boardById } = useSelector((state) => state.board)
   console.log('boardById: ', boardById)

   const dispatch = useDispatch()
   const addBoardFavorite = (boardId) => {
      dispatch(addFavorite({ boardId, workSpaceId: id }))
   }
   return (
      <div>
         <FilterCont>
            <div>
               <IconButtonStyled>
                  {boardById.favorite ? (
                     <StarFilledIcon
                        onClick={() => addBoardFavorite(boardById.boardId)}
                        fill="#0079BF"
                     />
                  ) : (
                     <StarBlue
                        onClick={() => addBoardFavorite(boardById.boardId)}
                     />
                  )}
               </IconButtonStyled>
            </div>
         </FilterCont>
      </div>
   )
}

const IconButtonStyled = styled(IconButton)({
   backgroundColor: '#E9E9E9',
})

const FilterCont = styled('div')({
   display: 'flex',
   width: '2.125rem',
   height: '2.125rem',
   padding: '0.375rem 1rem',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
})
