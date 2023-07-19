import React from 'react'
import { IconButton, styled } from '@mui/material'
import { RightIcon } from '../../../assets/icons'

export const NotifictionSection = ({ el }) => {
   return (
      <InfoBox>
         <div className="dd">
            <FirstBox key={el.id}>
               <UsersIcon src={el.img} />
               <PeoplesName>{el.nameOfPerson}</PeoplesName>
            </FirstBox>

            <SecondBox>
               <NotificationTitleWrapper>
                  {el.notification}
               </NotificationTitleWrapper>
               <AddedDate>{el.addedDate}</AddedDate>
            </SecondBox>
         </div>
         <IconButton style={{ marginTop: '1.6rem' }}>
            <RightIcon src={RightIcon} />
         </IconButton>
      </InfoBox>
   )
}

const InfoBox = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   '.dd': {
      width: '18.7rem',
      padding: '0 0 0 1.2rem',
   },
}))

const FirstBox = styled('div')(() => ({
   display: 'flex',
   alignContent: 'center',
   gap: '0.5rem',
   marginTop: '0.6rem',
}))

const UsersIcon = styled('img')(() => ({
   width: '2.125rem',
   height: '2.125rem',
   borderRadius: '50%',
   marginBottom: '0.7rem',
}))

const PeoplesName = styled('p')(() => ({
   marginTop: '0.35rem',
   fontFamily: 'CarePro',
   fontSize: '0.9rem',
   fontWeight: '600',
}))

const SecondBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}))

const AddedDate = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   color: '#919191',
   margin: '0.5rem 0 0.5rem 0',
}))

const NotificationTitleWrapper = styled('h3')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1rem',
   margin: '0',
   width: '17rem',
   overflow: 'hidden',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis',
   '&:hover': {
      textOverflow: 'clip',
      overflow: 'visible',
      whiteSpace: 'normal',
      cursor: 'pointer',
   },
}))
