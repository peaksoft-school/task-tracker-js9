import { Button, styled } from '@mui/material'
import { NotifictionSection } from './NotificationSectoin'
import { BlueIcon } from '../../../assets/icons'

export const Notification = ({ notificationsPanel }) => {
   return (
      <MainConatiner>
         <HeaderConatiner>
            <HeaderTitle>Notification</HeaderTitle>
            <MarkAsReadBtn>Mark as Read</MarkAsReadBtn>
         </HeaderConatiner>

         {notificationsPanel.length > 0 ? (
            <ScrollContainer>
               {notificationsPanel.map((el, index) => {
                  const lastItem = index === notificationsPanel.length - 1

                  return (
                     <MainBox key={el.id} lastItem={lastItem}>
                        <NotificatonBlueIcon>
                           <BlueIcon style={{ width: '1rem' }} />
                        </NotificatonBlueIcon>
                        <BoardConatiner>
                           <TitleofBoard>{el.titleofBoard}</TitleofBoard>
                           <NameofColumn>{el.nameofColumn}</NameofColumn>
                        </BoardConatiner>
                        <NotifictionSection el={el} />
                     </MainBox>
                  )
               })}
            </ScrollContainer>
         ) : (
            <NoNotification>
               <NonNotificationDescription>
                  No Notifications
               </NonNotificationDescription>
            </NoNotification>
         )}
      </MainConatiner>
   )
}

const MainConatiner = styled('div')(() => ({
   width: '24.48rem',
   borderRadius: '0.625rem',
   padding: '0.8rem 0.5rem 0.8rem 1.6rem',
   boxShadow: '0px 4px 14px 0px #00000021',
}))

const HeaderConatiner = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   padding: '0 1.2rem',
   gap: '2.5rem',
}))

const ScrollContainer = styled('div')(() => ({
   height: ' 50rem ',
   overflowY: 'auto ',
   scrollbarWidth: 'thin',
   scrollbarColor: ' #d9d9d9 transparent',

   ' &::-webkit-scrollbar ': {
      width: '0.5rem',
   },

   '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
   },

   ' &::-webkit-scrollbar-thumb ': {
      backgroundColor: ' #d9d9d9',
      borderRadius: '0.25rem',
   },
}))

const HeaderTitle = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1rem',
}))

const MarkAsReadBtn = styled(Button)(() => ({
   color: '#919191',
   fontFamily: 'CarePro',
   fontSize: '0.8rem',
   fontWeight: ' 500',
   textDecoration: 'underline',
   borderRadius: '100%',
   padding: '0',
   '&:hover': {
      background: '#F4F5F7',
      color: '#434343',
   },
   '&:active': {
      background: '#F4F5F7',
      color: '#919191',
      textDecoration: 'underline',
   },
}))

const MainBox = styled('div')(({ lastItem }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   borderBottom: '2px solid #E4E4E4',
   width: '21.4rem',
   ...(lastItem && {
      borderBottom: 'none',
   }),
}))
const NotificatonBlueIcon = styled('div')(() => ({
   position: 'relative',
   right: '10.45rem',
   top: '0.6rem',
}))

const BoardConatiner = styled('div')(() => ({
   borderRadius: '0.5rem',
   background: '#CBCBCB',
   width: '19.1rem',
   height: '8.625rem',
   padding: '0.8rem',
}))

const TitleofBoard = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1rem',
   color: '#fff',
   fontWeight: '500',
   margin: '1rem 0 0 1rem',
}))

const NameofColumn = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1rem',
   color: '#fff',
   fontWeight: '400',
   margin: '0.13rem 1rem',
}))

const NoNotification = styled('div')(() => ({
   height: '4rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const NonNotificationDescription = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1.3rem',
   fontWeight: '600',
   color: '#d74141',
}))
