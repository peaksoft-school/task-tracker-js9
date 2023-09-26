import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, IconButton, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HideIcon, ShowIcon } from '../../assets/icons'
import { profilePutRequest } from '../../store/profile/ProfileThunk'
import { ProfileActions } from '../../store/profile/ProfileSlice'
import { schema } from '../../utils/helpers/Helpers'

export const ProfileForm = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)

   const { item, avatarLink, getItemById } = useSelector(
      (state) => state.profile
   )
   const dispatch = useDispatch()

   const { role } = useSelector((state) => state.auth)

   const userRole = role

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
   } = useForm({
      defaultValues: {
         firstName: 'Ваше имя',
         lastName: 'Ваша фамилия',
         email: 'example@example.com',
         password: '',
         confirmPassword: '',
      },
      resolver: yupResolver(schema),
   })

   const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }

   const handleToggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(
         (prevShowConfirmPassword) => !prevShowConfirmPassword
      )
   }

   const password = watch('password')

   const handleSubmitPut = () => {
      const putData = {
         firstName: getItemById.firstName || item.firstName,
         lastName: getItemById.lastName || item.lastName,
         email: getItemById.email || item.email,
         password,
         avatar: avatarLink,
      }

      dispatch(profilePutRequest(putData))
      reset()
   }

   return (
      <div>
         <StyledFormContainer onSubmit={handleSubmit(handleSubmitPut)}>
            <div>
               <StyledTextField
                  id={item?.userId}
                  value={getItemById.firstName || item?.firstName || ''}
                  onChange={(e) =>
                     dispatch(ProfileActions.getFirstNameValue(e.target.value))
                  }
               />
               <StyledTextField
                  id={item?.userId}
                  value={getItemById.lastName || item?.lastName || ''}
                  onChange={(e) =>
                     dispatch(ProfileActions.getLastNameValue(e.target.value))
                  }
               />
               <StyledTextField
                  id={item?.userId}
                  value={getItemById.email || item?.email || ''}
                  onChange={(e) =>
                     dispatch(ProfileActions.getEmailValue(e.target.value))
                  }
               />
            </div>
            {userRole === 'ADMIN' && (
               <PasswordFieldsContainer>
                  <div>
                     <StyledPasswordField
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        {...register('password')}
                        error={passwordDirty && !!errors.password}
                        helperText={
                           passwordDirty && errors.password?.message
                              ? errors.password.message
                              : ''
                        }
                        onBlur={() => setPasswordDirty(true)}
                        placeholder="Пароль"
                        InputProps={{
                           endAdornment: (
                              <IconButton
                                 onClick={handleTogglePasswordVisibility}
                              >
                                 {showPassword ? <ShowIcon /> : <HideIcon />}
                              </IconButton>
                           ),
                        }}
                     />
                  </div>
                  <div>
                     <StyledPasswordField
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        {...register('confirmPassword')}
                        error={confirmPasswordDirty && !!errors.confirmPassword}
                        helperText={
                           confirmPasswordDirty &&
                           errors.confirmPassword?.message
                              ? errors.confirmPassword.message
                              : ''
                        }
                        onBlur={() => setConfirmPasswordDirty(true)}
                        InputProps={{
                           endAdornment: (
                              <IconButton
                                 onClick={handleToggleConfirmPasswordVisibility}
                              >
                                 {showConfirmPassword ? (
                                    <ShowIcon />
                                 ) : (
                                    <HideIcon />
                                 )}
                              </IconButton>
                           ),
                        }}
                     />
                     <ButtonDiv>
                        <SaveButton
                           type="submit"
                           variant="contained"
                           color="primary"
                        >
                           add
                        </SaveButton>
                     </ButtonDiv>
                  </div>
               </PasswordFieldsContainer>
            )}
         </StyledFormContainer>
      </div>
   )
}

const StyledFormContainer = styled('form')({
   gap: '1.87rem',
   display: 'flex',
   position: 'relative',
   bottom: '1rem',
   marginLeft: '3.75rem',
})

const StyledTextField = styled('input')({
   display: 'flex',
   width: '20.0625rem',
   height: '2.125rem',
   padding: '0.375rem 1rem',
   justifyContent: 'space-between',
   alignItems: 'center',
   borderRadius: '0.5rem',
   border: '1px solid #D0D0D0',
   marginBottom: '1rem',
   fontWeight: '500',
   fontFamily: 'CarePro',
})

const StyledPasswordField = styled(TextField)({
   width: '20.0625rem',
   marginBottom: '1rem',
   '& .MuiInputBase-root': {
      height: '2.125rem',
      borderRadius: '0.5rem',
   },
})

const PasswordFieldsContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})

const ButtonDiv = styled('div')({
   display: 'flex',
   justifyContent: 'end',
})

const SaveButton = styled(Button)({
   background: '#0079BF',
   display: 'flex',
   width: '4rem',
   height: '2.125rem',
   borderRadius: '1.5rem',
   gap: '0.5rem',
   fontFamily: 'CarePro',
   fontWeight: '400',
})
