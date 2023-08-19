import { styled, IconButton } from '@mui/material'
import { useState } from 'react'
import { EditIcon, FrameIcon } from '../../assets/icons'
import { StarFilter } from './filter/StarFilter'
import { Filter } from './filter/Filter'
import { Menu } from './menu/Menu'
import { Avatars } from './avatars/Avatars'
import { Participant } from './inviteModal/Participant'

export const LayoutMenu = () => {
   const [openModal, setOpenModal] = useState(false)

   const openModalHandler = () => {
      setOpenModal((prev) => !prev)
   }
   return (
      <LayoutMenuContainer>
         <div>
            <TitleBox>
               <IconButton>
                  <EditIcon />
               </IconButton>
               <TitleText>Title</TitleText>
            </TitleBox>
            <div>
               <span>Columns:</span>
               <CountSpan>24</CountSpan>
            </div>
         </div>
         {openModal && (
            <>
               <BackDrop onClick={openModalHandler} />
               <Participant openModalHandler={openModalHandler} />
            </>
         )}
         <FilterCont>
            <Avatars />
            <InviteBox onClick={openModalHandler}>
               <InviteText>Invite</InviteText>
               <FrameIcon />
            </InviteBox>
            <StarFilter />
            <Filter />
            <Menu />
         </FilterCont>
      </LayoutMenuContainer>
   )
}

const LayoutMenuContainer = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   width: 'auto',
})

const FilterCont = styled('div')({
   display: 'flex',
   alignItems: 'center',
   marginRight: '3rem',
   gap: '1rem',
})

const TitleBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.4rem',
})

const TitleText = styled('p')({
   fontWeight: 'bold',
})
const InviteBox = styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '5rem',
   gap: '0.5rem',
   cursor: 'pointer',
})
const InviteText = styled('p')({
   color: '#2f1fe6',
})

const BackDrop = styled('div')({
   position: 'absolute',
   backgroundColor: '#b6b6b6',
   width: '100%',
   height: '100vh',
   zIndex: '1',
})

const CountSpan = styled('span')({
   padding: '0.1rem 0.3125rem',
   borderRadius: '1rem',
   background: '#B2B2B2',
   color: '#FFFFFF',
   fontSize: '0.875rem',
})
