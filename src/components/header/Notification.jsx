import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { getNotifications } from '../../store/notification/notificationThunk'
import { NotificationSms, TimeIcon } from '../../assets/icons'

export const Notification = ({ notificationHandler }) => {
   const { notifications } = useSelector((state) => state.notifications)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getNotifications())
   }, [])

   const formatDateAndTime = (dateString) => {
      const date = new Date(dateString)
      const formattedDate = format(date, 'MMM dd yyyy')
      const formattedTime = format(date, 'hh:mm a')
      return { formattedDate, formattedTime }
   }

   return (
      <Containerr animation="slideIn">
         <Backdrop onClick={notificationHandler} />
         <HeaderBlock>
            <p>{}</p>
            <NotificationText>Notification</NotificationText>
            <SecondText>Mark as read</SecondText>
         </HeaderBlock>
         <WrapperBlock>
            {notifications.map((notification) => (
               <ManyContainers key={notification.id}>
                  {notification.isRead ? null : <NotificationSmsIcon />}
                  <WrapperNotifications>
                     <ContainerImages>
                        <TitleBoard>{notification.titleBoard}</TitleBoard>
                        <ColumnText>{notification.columnName}</ColumnText>
                        {notification.backGround ? (
                           <ColorBlock color={notification.backGround} />
                        ) : (
                           <ImageStyled
                              src={notification.backGround}
                              alt="Board photo"
                              style={{
                                 backgroundImage: `url(${notification.backGround})`,
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                                 backgroundRepeat: 'no-repeat',
                              }}
                           />
                        )}
                     </ContainerImages>
                     <ContainerInfo>
                        <WrapperUsers>
                           {notification.notificationType === 'REMINDER' ? (
                              <WrapperNotificationTypes>
                                 <TImeIconContainer>
                                    <TimeIcon />
                                 </TImeIconContainer>
                                 <ReminderText>
                                    {notification.notificationType}
                                 </ReminderText>
                              </WrapperNotificationTypes>
                           ) : (
                              <>
                                 <UserImage
                                    src={notification.imageUser}
                                    alt=""
                                 />
                                 <UserName>{notification.fullName}</UserName>{' '}
                              </>
                           )}
                        </WrapperUsers>
                        <WrapperInfo>
                           <NotificationTitle>
                              {notification.text}
                           </NotificationTitle>
                           <div style={{ display: 'flex', gap: '0.3rem' }}>
                              <span className="styledTime">
                                 {
                                    formatDateAndTime(notification.createdDate)
                                       .formattedDate
                                 }
                              </span>
                              <span className="styledTime">
                                 {
                                    formatDateAndTime(notification.createdDate)
                                       .formattedTime
                                 }
                              </span>
                           </div>
                        </WrapperInfo>
                     </ContainerInfo>
                  </WrapperNotifications>
               </ManyContainers>
            ))}
         </WrapperBlock>
      </Containerr>
   )
}
const Backdrop = styled('div')(() => ({
   position: 'fixed',
   width: '100%',
   height: '100%',
   backgroundColor: '#ffffff0',
   top: '0',
   left: '0',
   zIndex: -1,
}))
const Containerr = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }

         break
      default:
         break
   }
   return {
      width: '22.5625rem',
      maxHeight: '35rem',
      position: 'absolute',
      right: '2rem',
      top: '4.5rem',
      boxShadow: '-4px 2px 20px 9px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      zIndex: '999',
      borderRadius: '0.625rem',
      overflowY: 'auto ',
      scrollbarWidth: 'thin',
      scrollbarColor: ' #D9D9D9 transparent',
      ' &::-webkit-scrollbar ': {
         width: '0.5rem',
      },
      '&::-webkit-scrollbar-track': {
         backgroundColor: 'transparent',
      },
      ' &::-webkit-scrollbar-thumb ': {
         backgroundColor: ' #D9D9D9',
         borderRadius: '0.25rem',
      },

      ...animationStyles,

      '@keyframes slideInAnimation': {
         '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
         },
         '100%': {
            transform: 'translateX(0)',
            opacity: 1,
         },
      },
   }
})

const HeaderBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '1rem',
}))

const NotificationText = styled('p')(() => ({
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
}))

const SecondText = styled('p')(() => ({
   color: '#919191',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
   textDecorationLine: 'underline',
   cursor: 'pointer',
}))

const WrapperBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))
const ManyContainers = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   position: 'relative',
   borderBottom: ' 1px solid #E3E3E3',
   paddingBottom: '0.5rem',
}))

const ImageStyled = styled('img')(() => ({
   width: '19rem',
   height: '8.5rem',
   borderRadius: '10px',
   border: '1px solid green',
}))

const ColorBlock = styled('div')(({ color }) => ({
   width: '19rem',
   height: '8.5rem',
   borderRadius: '10px',
   backgroundColor: color,
   border: '1px solid green',
}))

const ContainerImages = styled('div')(() => ({
   width: '100%',
   position: 'relative',
}))

const TitleBoard = styled('p')(() => ({
   position: 'absolute',
   left: '1rem',
   top: '1rem',
   color: '#FFF',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: ' 500',
   lineHeight: 'normal',
}))
const ColumnText = styled('p')(() => ({
   position: 'absolute',
   left: '1rem',
   top: '2.3rem',
   color: '#FFF',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: ' 500',
   lineHeight: 'normal',
}))
const NotificationTitle = styled('p')(() => ({
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: '600',
   lineHeight: 'normal',
   color: 'black',
}))

const UserImage = styled('img')(() => ({
   width: '2.125rem',
   height: '2.125rem',
   borderRadius: '50%',
}))

const UserName = styled('p')(() => ({
   fontSize: ' 0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
}))

const WrapperUsers = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   marginTop: '1rem',
   gap: '0.5rem',
}))
const WrapperInfo = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   '.styledTime': {
      fontSize: ' 0.875rem',
      fontStyle: 'normal',
      fontWeight: ' 400',
      lineHeight: 'normal',
      color: '#919191',
   },
}))
const ContainerInfo = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))
const WrapperNotifications = styled('div')(() => ({
   position: 'relative',
   left: '0.8rem',
}))

const NotificationSmsIcon = styled(NotificationSms)(() => ({
   position: 'relative',
   top: '1.5rem',
   left: '-0.3rem',
}))

const ReminderText = styled('span')(() => ({
   textTransform: 'lowercase',
   fontWeight: '400',
   fontSize: '0.875rem',
}))

const WrapperNotificationTypes = styled('div')(() => ({
   display: 'flex',
   gap: '0.5rem',
   alignItems: 'center',
}))
const TImeIconContainer = styled('div')(() => ({
   backgroundColor: '#F0F0F0;',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '0.31rem',
}))
