import { IconButton, TextField, styled } from '@mui/material'
import { Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { LayoutFormPage } from './LayoutFormPage'
import { Button } from '../components/UI/button/Button'
import { HideIcon, ShowIcon } from '../assets/icons'
import { resetPasswordRequest } from '../store/auth/authThunk'
import { showSnackbar } from '../components/UI/snackbar/Snackbar'

export const ResetPasswordPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const initialValues = {
      newPassword: '',
      repeatPassword: '',
   }

   const validationSchema = Yup.object({
      newPassword: Yup.string()
         .required('Password is required')
         .min(6, 'Password must be at least 6 characters long'),
      repeatPassword: Yup.string()
         .required('Repeat password is required')
         .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
   })

   const handleSubmit = (values) => {
      values.userId = +id
      dispatch(resetPasswordRequest(values))
         .unwrap()
         .then(() => {
            showSnackbar({
               message: 'Sign In successful!',
               severity: 'success',
            })

            navigate('/mainPage')
         })
         .catch((error) => {
            showSnackbar({
               message: error,
               additionalMessage: 'Please try again .',
               severity: 'error',
            })
         })
   }

   return (
      <LayoutFormPage>
         <Container>
            <TextPassword>Password</TextPassword>
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
               validateOnChange
               validateOnBlur
            >
               {({ values, errors, touched, setFieldValue, handleChange }) => (
                  <StyledForm>
                     <WrapperInputs>
                        <ContainerPasswordInput>
                           <StyledInputs
                              size="small"
                              type={
                                 values.passwordVisibility ? 'text' : 'password'
                              }
                              placeholder="Password"
                              name="newPassword"
                              as={TextField}
                              error={
                                 touched.newPassword && !!errors.newPassword
                              }
                              value={values.newPassword}
                              onChange={handleChange}
                              InputProps={{
                                 endAdornment: (
                                    <IconButton
                                       onClick={() =>
                                          setFieldValue(
                                             'passwordVisibility',
                                             !values.passwordVisibility
                                          )
                                       }
                                    >
                                       {values.passwordVisibility ? (
                                          <ShowIcon />
                                       ) : (
                                          <HideIcon />
                                       )}
                                    </IconButton>
                                 ),
                              }}
                           />
                        </ContainerPasswordInput>
                        {errors.newPassword && touched.newPassword && (
                           <ErrorText>{errors.newPassword}</ErrorText>
                        )}
                        <ContainerPasswordInput>
                           <StyledInputs
                              size="small"
                              type={
                                 values.repeatPasswordVisibility
                                    ? 'text'
                                    : 'password'
                              }
                              placeholder="Repeat password"
                              name="repeatPassword"
                              as={TextField}
                              error={
                                 touched.repeatPassword &&
                                 !!errors.repeatPassword
                              }
                              value={values.repeatPassword}
                              onChange={handleChange}
                              className={
                                 values.newPassword &&
                                 values.repeatPassword &&
                                 values.newPassword === values.repeatPassword
                                    ? 'matched'
                                    : ''
                              }
                              InputProps={{
                                 endAdornment: (
                                    <IconButton
                                       onClick={() =>
                                          setFieldValue(
                                             'repeatPasswordVisibility',
                                             !values.repeatPasswordVisibility
                                          )
                                       }
                                    >
                                       {values.repeatPasswordVisibility ? (
                                          <ShowIcon />
                                       ) : (
                                          <HideIcon />
                                       )}
                                    </IconButton>
                                 ),
                              }}
                           />
                        </ContainerPasswordInput>
                        {errors.repeatPassword && touched.repeatPassword && (
                           <ErrorText>{errors.repeatPassword}</ErrorText>
                        )}
                        <WrapperButton>
                           <StyledButton type="submit">Log in</StyledButton>
                        </WrapperButton>
                     </WrapperInputs>
                  </StyledForm>
               )}
            </Formik>
         </Container>
      </LayoutFormPage>
   )
}

// Styled components...

const StyledForm = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   height: '25vh',
}))

const ContainerPasswordInput = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   width: '100%',
   // marginRight: '0rem',
}))

const StyledInputs = styled(TextField)(() => ({
   '& .MuiInputBase-root': {
      width: '21rem',
   },
   padding: '0.375rem 1rem',
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
         borderRadius: '0.5rem',
      },
      '&:hover fieldset': {
         border: '1px solid #D0D0D0',
      },
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ' #D0D0D0',
   },
   '& .css-1qi90xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
   },
   '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root': {
      padding: '0',
   },
   '&.matched .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: 'green',
      },
   },
}))

const ErrorText = styled('span')(() => ({
   color: 'red',
   fontSize: '0.75rem',
   marginLeft: '1.25rem',
}))

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
   marginRight: '4rem',
}))

const TextPassword = styled('h2')(() => ({
   color: '#000',
   fontFamily: ' CarePro',
   fontSize: '1.125rem',
   fontStyle: 'normal',
   fontWeight: 'bold',
   lineHeight: 'normal',
}))

const WrapperInputs = styled('div')(() => ({
   height: '25vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}))

const WrapperButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))

const StyledButton = styled(Button)(() => ({
   '&:hover': {
      backgroundColor: '#005688',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
   },
   width: '8.6875rem',
   lineHeight: 'normal',
   padding: '0.5rem 1rem',
   textTransform: 'capitalize',
}))
