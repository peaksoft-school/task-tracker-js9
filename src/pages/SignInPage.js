import { IconButton, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { LayoutFormPage } from './LayoutFormPage'
import { ShowIcon, HideIcon, GoogleIcon } from '../assets/icons'
import { Button } from '../components/UI/button/Button'
import { ModalUi } from '../components/UI/modal/Modal'
import {
   authWithGoogleRequest,
   forgotPasswordRequest,
   signInRequest,
} from '../store/auth/authThunk'
import Snackbar, { showSnackbar } from '../components/UI/snackbar/Snackbar'
import IsLoading from '../components/UI/snackbar/IsLoading'
import { auth, provider } from '../config/firebase'

export const SignInPage = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [emailValue, setEmailValue] = useState('')

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { isLoading } = useSelector((state) => state.auth)

   const disabledButton = emailValue.length === 0 || !emailValue.includes('@')

   const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }
   const handleOpenModal = () => {
      setIsModalOpen((state) => !state)
   }

   const initialValues = {
      email: '',
      password: '',
   }

   const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
         .required('Password is required')
         .min(6, 'Password must be at least 6 characters'),
   })

   const handleSubmit = (values) => {
      dispatch(signInRequest(values))
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

   const geteEmailValue = (e) => {
      setEmailValue(e.target.value)
   }
   const handleResetPassword = async () => {
      const data = {
         email: emailValue,
         link: `http://localhost:3000/forgotPassword`,
      }

      try {
         await dispatch(forgotPasswordRequest(data)).unwrap()

         showSnackbar({
            message: 'Email send !',
            severity: 'success',
         })
         handleOpenModal()
         setEmailValue('')
      } catch (error) {
         showSnackbar({
            message: error,
            additionalMessage: 'Please try again .',
            severity: 'error',
         })
      }
   }

   const signInWithGoogleHandler = async () => {
      try {
         return await signInWithPopup(auth, provider).then((data) => {
            dispatch(authWithGoogleRequest(data.user.accessToken))
               .unwrap()
               .then(() => {
                  showSnackbar({
                     message: 'Sign In successful!',
                     severity: 'success',
                  })

                  navigate('/mainPage')
               })
               .catch((error) =>
                  showSnackbar({
                     message: error,
                     additionalMessage: 'Please try again .',
                     severity: 'error',
                  })
               )
         })
      } catch (error) {
         return error
      }
   }

   return (
      <>
         {isLoading && <IsLoading />}

         <LayoutFormPage>
            <Container>
               <div className="head">
                  <h2>Sign in</h2>

                  <AuthWithGoogle onClick={signInWithGoogleHandler}>
                     <AuthWithText>Auth with google</AuthWithText>
                     <GoogleIcon />
                  </AuthWithGoogle>
                  <p>or</p>
               </div>

               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
               >
                  {({ values, errors, touched, handleChange }) => (
                     <Form>
                        <MainWrapper>
                           <WrapperInputs>
                              <div className="inputBlock">
                                 <div>
                                    <EmailInput
                                       size="small"
                                       placeholder="example@gmail.com"
                                       name="email"
                                       value={values.email}
                                       onChange={handleChange}
                                       error={touched.email && !!errors.email}
                                    />
                                    {errors.email && touched.email && (
                                       <ErrorText>{errors.email}</ErrorText>
                                    )}
                                 </div>
                                 <div className="password">
                                    <ContainerInputs>
                                       <PasswordInput
                                          size="small"
                                          type={
                                             showPassword ? 'text' : 'password'
                                          }
                                          placeholder="Password"
                                          name="password"
                                          value={values.password}
                                          onChange={handleChange}
                                          error={
                                             touched.password &&
                                             !!errors.password
                                          }
                                          InputProps={{
                                             endAdornment: (
                                                <IconButton
                                                   onClick={
                                                      handleTogglePasswordVisibility
                                                   }
                                                >
                                                   {showPassword ? (
                                                      <ShowIcon />
                                                   ) : (
                                                      <HideIcon />
                                                   )}
                                                </IconButton>
                                             ),
                                          }}
                                       />
                                    </ContainerInputs>
                                    {errors.password && touched.password && (
                                       <ErrorText>{errors.password}</ErrorText>
                                    )}
                                 </div>
                              </div>
                              <ForgotPassword
                                 onClick={(event) => {
                                    event.preventDefault()
                                    handleOpenModal()
                                 }}
                              >
                                 Forgot password?
                              </ForgotPassword>
                           </WrapperInputs>

                           <LoginButton type="submit">Log In</LoginButton>
                           <MainBlock>
                              <p>Not a member?</p>
                              <SignUpText to="/signup"> Sign up now</SignUpText>
                           </MainBlock>
                        </MainWrapper>
                     </Form>
                  )}
               </Formik>
               {isModalOpen && (
                  <ModalUi open={isModalOpen} onClose={handleOpenModal}>
                     <ModalStyle>
                        <h3>Forgot Password ?</h3>
                        <ModalSecondText>
                           A link will be sent to your Email, follow the link
                           sent to the mail
                        </ModalSecondText>
                        <ModalInput
                           size="small"
                           type="email"
                           placeholder="example@gmail.com"
                           value={emailValue}
                           onChange={geteEmailValue}
                        />
                        <WrapperModalButton>
                           <ModalButton
                              disabled={disabledButton}
                              onClick={handleResetPassword}
                           >
                              send
                           </ModalButton>
                        </WrapperModalButton>
                     </ModalStyle>
                  </ModalUi>
               )}
            </Container>
            <Snackbar />
         </LayoutFormPage>
      </>
   )
}

// Styled components...

const Container = styled('div')(({ theme }) => ({
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   gap: '1.25rem',
   // marginRight: '4rem',
   '.head': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.60rem',

      h2: {
         marginBottom: '1.25rem',
      },
      p: {
         color: theme.palette.secondary.gray,
      },
   },
}))

const AuthWithGoogle = styled('div')(({ theme }) => ({
   cursor: 'pointer',
   display: 'flex',
   gap: '1rem',
   width: '100%',
   height: '3.625rem',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: theme.palette.secondary.lightGray,
   borderRadius: '0.5rem',
}))

const ContainerInputs = styled('div')(() => ({
   position: 'relative',
   display: 'flex',
   width: '100%',
}))

const EmailInput = styled(TextField)(() => ({
   '& .MuiOutlinedInput-input': {
      borderRadius: '0.5rem',
      width: '19.8rem',
      padding: '0.575rem 1rem',
      backgroundColor: '#fff',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #D0D0D0',
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
}))

const PasswordInput = styled(TextField)(() => ({
   '& .MuiInputBase-root': {
      width: '21.9rem',
   },
   '& .MuiInputBase-input': {
      borderRadius: '0.5rem',
   },
   '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root': {
      padding: '0',
   },
   '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
      position: 'relative',
      width: '20.0625rem',
   },
   '& .css-bgk865-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
   },
   '& .MuiOutlinedInput-input': {
      borderRadius: '0.5rem',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: ' 1px solid #D0D0D0',
         borderRadius: '0.5rem',
      },
      '&:hover fieldset': {
         border: ' 1px solid #D0D0D0',
         borderRadius: '0.5rem',
      },
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: ' 1px solid #D0D0D0',
   },
}))

const LoginButton = styled(Button)(({ theme }) => ({
   width: '8.6rem',
   height: '2.125rem',
   fontSize: '0.875rem',
   fontWeight: '400',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   margin: '1.87rem 0 ',

   backgroundColor: theme.palette.primary.blue,
   '&:hover': {
      backgroundColor: ' #005688;',
   },
   '&:active': {
      backgroundColor: ' #57AEE0;',
   },
   '&.MuiButtonBase-root': {
      textTransform: 'none',
   },
}))

const ModalStyle = styled('div')(() => ({
   width: '28.75rem',
   height: '12.125rem',
   display: 'flex',
   gap: '0.88rem',
   flexDirection: 'column',
   padding: '1.25rem 1.75rem 1.25rem 1.25rem',
}))

const WrapperModalButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}))

const ModalInput = styled(TextField)(() => ({
   width: '25.75rem',
   '& .MuiOutlinedInput-input': {
      borderRadius: '0.5rem',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: ' 1px solid #D0D0D0',
      },
      '&:hover fieldset': {
         border: ' 1px solid #D0D0D0',
      },
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: ' 1px solid #D0D0D0',
   },
}))

const ModalSecondText = styled('p')(() => ({
   width: '25.75rem',
   fontSize: ' 0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   color: ' #707070',
}))

const ModalButton = styled(Button)(() => ({
   '&:hover': {
      backgroundColor: '#005688;',
   },
   '&:active': {
      backgroundColor: ' #57AEE0;',
   },

   width: '8.6rem',
   height: '2.125rem',
   fontSize: '0.875rem',
   fontWeight: '400',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const MainBlock = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
}))

const MainWrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}))

const WrapperInputs = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',

   '.inputBlock': {
      height: '11vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      '.password': {
         height: '3vh',
      },
   },
}))

const ForgotPassword = styled('p')(({ theme }) => ({
   width: '95%',
   display: 'flex',
   justifyContent: 'end',
   marginTop: '1rem',
   color: theme.palette.primary.blue,
   cursor: 'pointer',
}))

const SignUpText = styled(NavLink)(({ theme }) => ({
   color: theme.palette.primary.blue,
}))

const AuthWithText = styled('p')(({ theme }) => ({
   color: theme.palette.primary.blue,
}))

const ErrorText = styled('p')(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.875rem',
   fontWeight: '400',
}))

export default SignInPage
