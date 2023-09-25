import { styled } from '@mui/material'
import { ModalUi } from '../../UI/modal/Modal'
import { Button } from '../../UI/button/Button'

export const DeleteBoardModal = ({
   showDeleteBoardModal,
   openCloseModalDeleteBoard,
   deleteBoardHandler,
}) => {
   return (
      <ModalUi open={showDeleteBoardModal} onClose={openCloseModalDeleteBoard}>
         <Container>
            <div>
               <h3 style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                  Delete board:
               </h3>
            </div>
            <SecondBlock>
               <ClarifyStyled>
                  Are you sure to delete this board ?
               </ClarifyStyled>
            </SecondBlock>
            <ThirdBlock>
               <CanselButton onClick={openCloseModalDeleteBoard}>
                  Cancel
               </CanselButton>
               <DeleteButton onClick={deleteBoardHandler}>Delete</DeleteButton>
            </ThirdBlock>
         </Container>
      </ModalUi>
   )
}

const Container = styled('div')(() => ({
   width: '22.9375rem',
   height: '11.125rem',
   borderRadius: '0.625rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}))
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))
const ThirdBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '1rem',
}))
const ClarifyStyled = styled('span')(() => ({
   fontSize: '1rem',
   color: '#111',
   display: 'flex',
   justifyContent: 'center',
}))
const CanselButton = styled(Button)(() => ({
   height: '2.125rem',
   width: '4.885rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   backgroundColor: '#F0F0F0',
   textTransform: 'capitalize',
   color: '#919191',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      backgroundColor: '#b6b6b6',
      color: 'white',
   },
}))
const DeleteButton = styled(Button)(() => ({
   height: '2.125rem',
   width: '4.75rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   textTransform: 'capitalize',
   backgroundColor: '#D91212',
   '&:hover': {
      backgroundColor: '#971414',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#db3333',
   },
}))
