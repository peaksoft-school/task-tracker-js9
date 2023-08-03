import React, { useRef, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { styled } from '@mui/material'
import { ModalUi } from '../UI/modal/Modal'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'

const validationSchema = Yup.object().shape({
   workspaceName: Yup.string().required('Name of the workspace is required'),
   inviteMember: Yup.array()
      .of(
         Yup.object().shape({
            value: Yup.string().email('Invalid email format'),
            label: Yup.string().email('Invalid email format'),
         })
      )
      .required('At least one email is required')
      .min(1, 'Please provide at least one email'),
   tempValue: Yup.string().email('Invalid email format'),
})

const NewWorkspaceForm = ({ showModal, setShowModal }) => {
   const [value, setValue] = useState([])
   const formikRef = useRef()

   const handleFormSubmit = (values, formikBag) => {
      if (formikRef.current) {
         formikRef.current.setFieldValue('inviteMember', [])
      }
      if (!values.inviteMember || values.inviteMember.length === 0) {
         return
      }

      formikBag.setFieldValue('todoEmails', [
         ...values.todoEmails,
         ...values.inviteMember,
      ])
   }

   const createOption = (label) => ({
      label,
      value: label,
   })

   const handleCreatableChange = (newValue, actionMeta) => {
      if (actionMeta.action === 'create-option') {
         const newOption = createOption(newValue.label)
         console.log(newOption)
         setValue([...value, newOption])
      } else {
         setValue(newValue)
      }
   }

   const createNewWorkspace = (values) => {
      console.log('Creating workspace...', values)

      setShowModal(false)
   }

   console.log(value)

   return (
      <div>
         {showModal && (
            <StyleModalUi open={showModal} onClose={() => setShowModal(false)}>
               <NewWorkspace>Create a new workspace</NewWorkspace>
               <Formik
                  ref={formikRef}
                  initialValues={{
                     tempValue: '',
                     workspaceName: '',
                     inviteMember: [],
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
               >
                  {({
                     values,
                     isSubmitting,
                     isValid,
                     errors,
                     touched,
                     handleChange,
                  }) => (
                     <InputContainer>
                        <LebelStyle
                           sx={{ padding: '0 0 0.5rem 0' }}
                           htmlFor="workspaceName"
                        >
                           Name of the workspace*
                        </LebelStyle>
                        <div>
                           <InputStyle
                              type="text"
                              placeholder="Name"
                              id="workspaceName"
                              name="workspaceName"
                              borderRadius="0.3rem"
                              onChange={handleChange}
                              value={values.workspaceName}
                              error={
                                 touched.workspaceName && !!errors.workspaceName
                              }
                           />
                           <ErrorMessage
                              name="workspaceName"
                              component="div"
                              style={{ color: 'red' }}
                           />
                        </div>

                        <div>
                           <LebelStyle htmlFor="inviteMember">
                              Invite a member
                           </LebelStyle>
                           <EmailInputContainer>
                              <CreatableSelect
                                 isClearable
                                 isMulti
                                 components={{ DropdownIndicator: null }}
                                 inputValue={values.tempValue}
                                 options={value}
                                 onChange={handleCreatableChange}
                                 onInputChange={(newValue) =>
                                    handleChange({
                                       target: {
                                          name: 'tempValue',
                                          value: newValue,
                                       },
                                    })
                                 }
                                 placeholder="example@gmail.com"
                              />
                           </EmailInputContainer>
                           <ErrorMessage
                              name="inviteMember"
                              component="div"
                              style={{ color: 'red' }}
                           />
                        </div>

                        <ButtonContainer>
                           <CanselButton
                              type="button"
                              onClick={() => setShowModal(false)}
                           >
                              Cancel
                           </CanselButton>
                           <SaveButton
                              disabled={isValid && !isSubmitting}
                              type="button"
                              onClick={() => createNewWorkspace(values)}
                           >
                              Create
                           </SaveButton>
                           <Button type="submit" style={{ display: 'none' }} />
                        </ButtonContainer>
                     </InputContainer>
                  )}
               </Formik>
            </StyleModalUi>
         )}
      </div>
   )
}

export default NewWorkspaceForm

const StyleModalUi = styled(ModalUi)(() => ({
   display: 'flex',
   flexDirection: 'column',
   height: 'auto',
   width: '24.9625rem',
   bordeRadius: '0.625rem',
   background: '#FFF',
}))
const LebelStyle = styled('label')(() => ({
   color: '#919191',
   fontSize: '0.875rem',
   marginTop: '1.25rem',
}))
const InputContainer = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.5rem',
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   height: 'auto',
   gap: '1.5rem',
   justifyContent: 'end',
   marginTop: '1.5rem',
}))
const CanselButton = styled(Button)(() => ({
   height: '2.125',
   width: '5.125rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   backgroundColor: '#F0F0F0',
   textTransform: 'capitalize',
   color: '#919191',
   padding: '0.5rem 1rem',
}))
const SaveButton = styled(Button)(() => ({
   height: '2.125',
   width: '5.125rem',
   bordeRadius: '1.5rem',
   fontFamily: 'CarePro',
   textTransform: 'capitalize',
   padding: '0.5rem 1rem',
   '&:hover': {
      backgroundColor: '#005688',
      color: '#ffff',
   },
   '&:active': {
      backgroundColor: '#57AEE0',
   },
}))

const NewWorkspace = styled('span')(() => ({
   fontSize: '1rem',
   color: '#000',
   display: 'flex',
   justifyContent: 'center',
   marginBottom: '1rem',
}))

const InputStyle = styled(Input)(() => ({
   input: {
      width: '20.5625rem',
      height: '1.8rem',
      padding: ' 0.375rem 1rem',
      alignItems: ' center',
      borderRadius: '0.5rem',
   },
}))
const EmailInputContainer = styled('div')(() => ({
   width: '100%',
   borderRadius: ' 0.3rem',
   border: ' 1px solid #D0D0D0',
}))
