import React, { useRef, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import CreatableSelect from 'react-select/creatable'
import { useDispatch } from 'react-redux'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { styled } from '@mui/material'
import { ModalUi } from '../UI/modal/Modal'
import { Input } from '../UI/input/Input'
import { Button } from '../UI/button/Button'
import { createNewWorkspace } from '../../store/workspace/workspaceThunk'

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const validationSchema = Yup.object().shape({
   workspaceName: Yup.string().required('Name of the workspace is required'),
   invitedMembers: Yup.array().of(
      Yup.object().shape({
         value: Yup.string()
            .matches(emailRegExp, 'Invalid email format')
            .required('Email is required'),
      })
   ),
})

const NewWorkspaceForm = ({ showModal, setShowModal }) => {
   const dispatch = useDispatch()
   const [tempValue, setTempValue] = useState('')
   const formikRef = useRef()

   const isDuplicate = (newMember, invitedMembers) => {
      return invitedMembers.some((member) => member.value === newMember)
   }

   const handleFormSubmit = (values) => {
      const data = values.invitedMembers.map((item) => item.value)

      const newdata = {
         emails: data,
         name: values.workspaceName,
         link: 'http://localhost:3000/signup',
      }
      dispatch(createNewWorkspace(newdata))
      setShowModal(false)
   }

   const closeModal = () => {
      setShowModal(false)
   }

   return (
      <div>
         {showModal && (
            <StyleModalUi open={showModal} onClose={closeModal}>
               <NewWorkspace>Create a new workspace</NewWorkspace>
               <Formik
                  ref={formikRef}
                  initialValues={{
                     workspaceName: '',
                     invitedMembers: [],
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
               >
                  {({
                     values,
                     handleChange,
                     setFieldValue,
                     errors,
                     isValid,
                  }) => (
                     <InputContainer>
                        <LebelStyle htmlFor="workspaceName">
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
                           />
                           <ErrorMessage
                              name="workspaceName"
                              component="div"
                              style={{ color: 'red' }}
                           />
                        </div>

                        <LebelStyle htmlFor="inviteMember">
                           Invite a member
                        </LebelStyle>
                        <div>
                           <CreatableSelect
                              className="basic-multi-select"
                              isClearable
                              isMulti
                              inputValue={tempValue}
                              onInputChange={(newValue) =>
                                 setTempValue(newValue)
                              }
                              name="invitedMembers"
                              value={values.invitedMembers}
                              components={{ DropdownIndicator: null }}
                              onChange={(selected) => {
                                 setFieldValue('invitedMembers', selected)
                              }}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter' && e.target.value) {
                                    e.preventDefault()
                                    const newMember = e.target.value
                                    if (
                                       !isDuplicate(
                                          newMember,
                                          values.invitedMembers
                                       )
                                    ) {
                                       const member = {
                                          value: newMember,
                                          label: newMember,
                                       }
                                       setFieldValue('invitedMembers', [
                                          ...values.invitedMembers,
                                          member,
                                       ])
                                    }
                                    setTempValue('')
                                 }
                              }}
                              placeholder="example@gmail.com"
                           />

                           <p style={{ color: 'red' }}>
                              {errors?.invitedMembers
                                 ? errors.invitedMembers[0]?.value ||
                                   errors.invitedMembers
                                 : null}
                           </p>
                        </div>

                        <ButtonContainer>
                           <CanselButton
                              type="button"
                              onClick={() => setShowModal(false)}
                           >
                              Cancel
                           </CanselButton>
                           <SaveButton disabled={!isValid} type="submit">
                              Create
                           </SaveButton>
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
   padding: '0.5rem 0  0 0.3rem',
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

// const InputStyle = styled(Input)(() => ({
//    '& .MuiOutlinedInput-root': {
//       borderRadius: '0.25rem',
//    },
//    input: {
//       width: '20.4625rem',
//       height: '1.60rem',
//       padding: ' 0.375rem 1rem',
//       alignItems: ' center',
//       borderRadius: '0.5rem',
//    },
//    '::placeholder': {
//       color: 'black',
//    },
// }))
const InputStyle = styled(Input)(() => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '0.25rem',
   },
   input: {
      width: '20.4625rem',
      height: '1.60rem',
      padding: '0.375rem 1rem',
      alignItems: 'center',
      borderRadius: '0.5rem',
      '&:hover fieldset': {
         border: '3px solid #0079BF',
      },
      '&.Mui-focused fieldset': {
         border: '3px solid #38b5fe',
      },
      '::placeholder': {
         fontFamily: 'CarePro',

         color: '#000000',
         fontWeight: '600',
      },
   },
}))
