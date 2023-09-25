import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormControl, styled } from '@mui/material'
import { fetchParticipans } from '../../store/participants/partThunk'
import { Button } from '../UI/button/Button'
import { ParticipantsTable } from './ParticipantsTable'
import { InviteNewParticipant } from './InviteModal'
import { DeleteModal } from './DeleteModal'

export const Participants = () => {
   const { id } = useParams()

   const dispatch = useDispatch()
   const rows = useSelector((state) => state.participant.participants)
   const [role, setRole] = useState('ALL')
   const [openInviteNewModal, setOpenInviteNewModal] = useState(false)
   const [openDeleteModal, setOpenDeleteModal] = useState(false)
   const [userId, setUserId] = useState()
   const handleChange = (event) => {
      setRole(event.target.value)
   }

   const onCreateClick = () => {
      setOpenInviteNewModal((prev) => !prev)
   }

   const dataLength = rows.length

   const selectData = [
      { label: 'All', value: 'ALL' },
      { label: 'Admin', value: 'ADMIN' },
      { label: 'Member', value: 'MEMBER' },
   ]

   React.useEffect(() => {
      dispatch(fetchParticipans({ id, role }))
   }, [role])
   if (!id) {
      return <div>Loading...</div>
   }

   const onDelete = (userId) => {
      setUserId(userId)
      setOpenDeleteModal(!openDeleteModal)
   }

   return (
      <BodyContainer>
         <GlobalContainer>
            <HeaderContainer>
               <MainCont style={{ position: 'relative' }}>
                  <RoleSection>
                     <ViewAllIssues>View all issues</ViewAllIssues>
                     <FormControl>
                        <StyledSelect value={role} onChange={handleChange}>
                           {selectData.map((item) => (
                              <StyledMenuItem
                                 key={item.value}
                                 value={item.value}
                              >
                                 {item.label}
                              </StyledMenuItem>
                           ))}
                        </StyledSelect>
                     </FormControl>
                     {openInviteNewModal ? (
                        <InviteNewParticipant
                           rows={rows}
                           onCreateClick={onCreateClick}
                        />
                     ) : null}
                     {openDeleteModal ? (
                        <DeleteModal
                           onDelete={onDelete}
                           role={role}
                           userId={userId}
                        />
                     ) : null}
                  </RoleSection>
                  <MyBtnStyled onClick={() => onCreateClick()}>
                     Create
                  </MyBtnStyled>
               </MainCont>
               <Total>
                  Total:<TotalAmount>{dataLength}</TotalAmount>
               </Total>
            </HeaderContainer>
            <ParticipantsTable rows={rows} onDelete={onDelete} />
         </GlobalContainer>
      </BodyContainer>
   )
}

const BodyContainer = styled('div')(() => ({
   padding: '0.75rem 1.25rem 0rem 1.25rem',
   width: '100%',
}))

const GlobalContainer = styled('div')(() => ({
   marginTop: '50px',
   padding: '1.4rem 0 0 0',
   backgroundColor: '#ffffff',
   width: '100%',
   borderRadius: ' 0.5rem',
   fontFamily: 'CarePro',
}))

const HeaderContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '0 1.4rem 1.5rem 1.4rem ',
}))

const MainCont = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}))

const RoleSection = styled('div')(() => ({
   display: 'flex',
   alignContent: 'center',
   margin: '0',
   height: '1.2rem',
   gap: '1.88rem',
}))

const StyledSelect = styled(Select)(() => ({
   fontFamily: 'CarePro',

   '& .MuiSelect-select': {
      borderRadius: '5rem',
      padding: '0.2rem 0.875rem 0.2rem 1rem',
      width: '5rem',
      borderColor: '#D0D0D0',
      '&:hover': {
         borderColor: '#8d8c8c',
      },
      '&.Mui-focused': {
         borderColor: '#0079BF',
      },
   },
   '&.MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
      fieldset: {
         borderColor: '#D0D0D0',
      },
      '&:hover fieldset': {
         borderColor: '#8d8c8c',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#D0D0D0',
      },
   },
}))

const StyledMenuItem = styled(MenuItem)(() => ({
   fontFamily: 'CarePro',
}))

const ViewAllIssues = styled('p')(() => ({
   fontSize: '1.25rem',
   fontWeight: ' 600',
}))

const Total = styled('p')(() => ({
   color: '#919191',
   fontSize: '1rem',
   fontWeight: ' 400',
}))

const TotalAmount = styled('span')(() => ({
   marginLeft: '0.5rem ',
   display: 'inline-flex',
   padding: '0.1rem 0.3125rem ',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '0.5rem',
   borderRadius: '1rem',
   background: 'var(--secondary-gray-2, #B2B2B2)',
   color: '#fff',
}))

const MyBtnStyled = styled(Button)(() => ({
   fontFamily: 'CarePro',
   color: '#fff',
   borderRadius: ' 1.5rem',
   width: '5rem',
   padding: '0.4rem 2rem 0.4rem 2rem',
   textAlign: 'center',
   fontSize: '0.91rem',
   textTransform: 'capitalize',
   '&:hover': {
      backgroundColor: '#015c91',
      '&:active': {
         backgroundColor: '#0079BF',
      },
   },
}))
