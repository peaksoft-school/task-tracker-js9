import * as yup from 'yup'

export const validatePassword = (password) => {
   return password.length >= 6
}

export const schema = yup.object().shape({
   firstName: yup
      .string()
      .test('is-capitalized', 'Первая буква должна быть заглавной', (value) =>
         /^[A-ZА-ЯЁ]/.test(value)
      )
      .required('Необходимо заполнить имя'),
   lastName: yup
      .string()
      .test('is-capitalized', 'Первая буква должна быть заглавной', (value) =>
         /^[A-ZА-ЯЁ]/.test(value)
      )
      .required('Необходимо заполнить фамилию'),
   email: yup
      .string()
      .email('Неверный адрес электронной почты')
      .required('Необходимо заполнить адрес электронной почты'),
   password: yup
      .string()
      .required('Необходимо заполнить пароль')
      .min(6, 'Пароль должен содержать минимум 6 символов'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Необходимо подтвердить пароль'),
})
