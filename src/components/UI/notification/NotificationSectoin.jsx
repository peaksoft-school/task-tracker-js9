import React from 'react'
import { styled } from '@mui/material'
import { RightIcon } from '../../../assets/icons'

export const NotifictionSection = ({ el }) => {
   return (
      <InfoBox>
         <FirstBox>
            <UsersIcon src={el.img} />
            <PeoplesName>{el.nameOfPerson}</PeoplesName>
         </FirstBox>

         <SecondBox>
            <NotificationTitle>
               {el.notification}
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
               molestias consequatur. Laborum assumenda blanditiis eaque a. Quam
               hic dolor soluta!
            </NotificationTitle>
            <RightIcon src={RightIcon} />
         </SecondBox>
         <AddedDate>{el.addedDate}</AddedDate>
      </InfoBox>
   )
}
const InfoBox = styled('div')(() => ({
   width: '20.3rem',
   padding: '0 0 0 1.2rem',
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
   marginBottom: '0.8rem',
}))

const PeoplesName = styled('p')(() => ({
   marginTop: '0.35rem',
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
}))

const SecondBox = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))

const NotificationTitle = styled('h3')(() => ({
   fontFamily: 'CarePro',
   fontSize: '1rem',
   margin: '0',
   width: '18rem',
}))

const AddedDate = styled('p')(() => ({
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   color: '#919191',
   margin: '0.5rem 0 0.5rem 0',
}))
