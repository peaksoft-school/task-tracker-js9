import { TextField, styled } from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { LayoutFormPage } from './LayoutFormPage'
import { Button } from '../components/UI/button/Button'
import { HideIcon, ShowIcon } from '../assets/icons'

export const ResetPasswordPage = () => {
   const initialValues = {
      password: '',
      repeatPassword: '',
   }

   const validationSchema = Yup.object({
      password: Yup.string()
         .required('Password is required')
         .min(6, 'Password must be at least 6 characters long'),
      repeatPassword: Yup.string()
         .required('Repeat password is required')
         .oneOf([Yup.ref('password')], 'Passwords must match'),
   })

   const handleSubmit = (values) => {
      console.log(values)
      if (values.password === values.repeatPassword) {
         console.log('Success')
      } else {
         console.log('Error')
      }
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
                  <Form>
                     <WrapperInputs>
                        <ContainerPasswordInput>
                           <StyledInputs
                              size="small"
                              type={
                                 values.passwordVisibility ? 'text' : 'password'
                              }
                              placeholder="Password"
                              name="password"
                              as={TextField}
                              error={touched.password && !!errors.password}
                              value={values.password}
                              onChange={handleChange}
                           />
                           <IconEyes
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
                           </IconEyes>
                        </ContainerPasswordInput>
                        {errors.password && touched.password && (
                           <ErrorText>{errors.password}</ErrorText>
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
                                 values.password &&
                                 values.repeatPassword &&
                                 values.password === values.repeatPassword
                                    ? 'matched'
                                    : ''
                              }
                           />
                           <IconEyes
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
                           </IconEyes>
                        </ContainerPasswordInput>
                        {errors.repeatPassword && touched.repeatPassword && (
                           <ErrorText>{errors.repeatPassword}</ErrorText>
                        )}
                        <WrapperButton>
                           <StyledButton type="submit">Log in</StyledButton>
                        </WrapperButton>
                     </WrapperInputs>
                  </Form>
               )}
            </Formik>
         </Container>
      </LayoutFormPage>
   )
}

// Styled components...

const ContainerPasswordInput = styled('div')(() => ({
   //  position: 'relative',
   display: 'flex',
   alignItems: 'center',
   width: '100%',
}))
const IconEyes = styled('div')(() => ({
   position: 'relative',
   top: '8%',
   right: '12%',
}))

const StyledInputs = styled(TextField)(() => ({
   '& .MuiInputBase-input': {
      width: '20.0625rem',
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

// Other styled components...

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '1rem',
   marginTop: '10rem',
}))

const TextPassword = styled('h2')(() => ({
   color: '#000',
   fontFamily: ' CarePro',
   fontSize: '1.125rem',
   fontStyle: 'normal',
   fontWeight: '500',
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
