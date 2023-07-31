import { Checkbox, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { LayoutFormPage } from './LayoutFormPage'
import { GoogleIcon, HideIcon, ShowIcon } from '../assets/icons'
import { Button } from '../components/UI/button/Button'

export const SignUpPage = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showRepeatPassword, setShowRepeatPassword] = useState(false)

   const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
   }

   const handleToggleRepeatPassword = () => {
      setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword)
   }

   const initialValues = {
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
      termsAgreed: false,
   }

   const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      repeatPassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
         .required('Repeat password is required'),
      termsAgreed: Yup.boolean().oneOf([true], 'You must accept the terms'),
   })

   const handleSubmit = (values) => {
      console.log(values)
   }

   return (
      <LayoutFormPage>
         <Container>
            <div className="block-head">
               <h2>Sign up</h2>
               <AuthWithGoogle>
                  <AuthWithText>Auth with google</AuthWithText>
                  <GoogleIcon />
               </AuthWithGoogle>
               <TextOr>or</TextOr>
            </div>

            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {({ values, errors, touched, handleChange }) => (
                  <Form>
                     <WrapperInputs>
                        <div className="input-block">
                           <StyledInputs
                              size="small"
                              label="Name"
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              error={touched.name && !!errors.name}
                              helperText={<ErrorMessage name="name" />}
                           />
                        </div>
                        <div className="input-block">
                           <StyledInputs
                              size="small"
                              label="Surname"
                              type="text"
                              placeholder="Surname"
                              name="surname"
                              value={values.surname}
                              onChange={handleChange}
                              error={touched.surname && !!errors.surname}
                              helperText={<ErrorMessage name="surname" />}
                           />
                        </div>
                        <div className="input-block">
                           <StyledInputs
                              size="small"
                              label="Gmail"
                              type="text"
                              placeholder="example@gmail.com"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              error={touched.email && !!errors.email}
                              helperText={<ErrorMessage name="email" />}
                           />
                        </div>

                        <div className="input-block">
                           <ContainerPasswordInput>
                              <StyledInputs
                                 size="small"
                                 label="Password"
                                 placeholder="Password"
                                 type={showPassword ? 'text' : 'password'}
                                 name="password"
                                 value={values.password}
                                 onChange={handleChange}
                                 error={touched.password && !!errors.password}
                                 helperText={<ErrorMessage name="password" />}
                              />
                              <IconEyes
                                 onClick={handleTogglePasswordVisibility}
                              >
                                 {showPassword ? <ShowIcon /> : <HideIcon />}
                              </IconEyes>
                           </ContainerPasswordInput>
                        </div>
                        <div className="input-block">
                           <ContainerPasswordInput>
                              <StyledInputs
                                 size="small"
                                 label="Repeat password"
                                 placeholder="Repeat password"
                                 type={showRepeatPassword ? 'text' : 'password'}
                                 name="repeatPassword"
                                 value={values.repeatPassword}
                                 onChange={handleChange}
                                 error={
                                    touched.repeatPassword &&
                                    !!errors.repeatPassword
                                 }
                                 helperText={
                                    <ErrorMessage name="repeatPassword" />
                                 }
                              />
                              <IconEyes onClick={handleToggleRepeatPassword}>
                                 {showRepeatPassword ? (
                                    <ShowIcon />
                                 ) : (
                                    <HideIcon />
                                 )}
                              </IconEyes>
                           </ContainerPasswordInput>
                        </div>

                        <MainWrapper>
                           <Checkbox
                              name="termsAgreed"
                              checked={values.termsAgreed}
                              onChange={handleChange}
                           />
                           <div>
                              <TextACreatingAccount>
                                 Creating an account means you’re okay with our
                              </TextACreatingAccount>
                              <LinkACreatingAccount>
                                 Terms of Service, Privacy Policy.
                              </LinkACreatingAccount>
                           </div>
                        </MainWrapper>
                     </WrapperInputs>
                     <WrapperButton>
                        <StyledButton type="submit">Sign Up </StyledButton>
                     </WrapperButton>
                  </Form>
               )}
            </Formik>
            <LoginWrappwer>
               <p>You already have an account?</p>
               <TextInLogIn to="/"> Log in </TextInLogIn>
            </LoginWrappwer>
         </Container>
      </LayoutFormPage>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: '1.8rem',
   '.block-head': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      h2: {
         marginBottom: '1.25rem',
      },
   },
}))
const ContainerPasswordInput = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '0 0 0 22px',
}))
const IconEyes = styled('div')(() => ({
   position: 'relative',
   top: '18%',
   right: '10%',
}))
const AuthWithGoogle = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '1rem',
   width: '20.0625rem',
   height: '3.625rem',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: theme.palette.secondary.lightGray,
   borderRadius: '0.5rem',
}))

const WrapperInputs = styled('div')(() => ({
   width: '100%',
   height: '60vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-around',
   alignItems: 'center',
   gap: '15px',
   padding: '1rem',
   '.input-block': {
      height: '6vh',
   },
}))

const MainWrapper = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const LinkACreatingAccount = styled('p')(({ theme }) => ({
   color: theme.palette.primary.blue,
   fontFamily: 'CarePro',
   fontSize: '0.75rem',
   fontWeight: '400',
   textDecoration: 'underline',
}))

const TextACreatingAccount = styled('p')(() => ({
   fontSize: '0.75rem',
   fontWeight: '400',
}))

const TextOr = styled('p')(({ theme }) => ({
   color: theme.palette.secondary.gray,
   fontSize: '1rem',
   fontWeight: '400',
   marginTop: '0.8rem',
}))

const WrapperButton = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))

const LoginWrappwer = styled('div')(() => ({
   display: 'flex',
   gap: '0.1rem',
   marginTop: '1rem',
}))

const TextInLogIn = styled(NavLink)(({ theme }) => ({
   color: theme.palette.primary.blue,
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
   padding: '0.5rem 1 rem',
   textTransform: 'capitalize',
   marginTop: '1rem',
}))

const StyledInputs = styled(TextField)(() => ({
   '& .MuiInputBase-input': {
      width: '20.0625rem',
   },
   '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      boxSizing: 'border-box',
      padding: '0.375rem 1rem',
      borderRadius: '0.5rem',
      fontSize: 'small',
   },
   '& .css-1qi90xi-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
   },
   '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root ': {
      padding: '0',
      borderRadius: '0.5rem',
   },
}))

const AuthWithText = styled('p')(({ theme }) => ({
   color: theme.palette.primary.blue,
}))
