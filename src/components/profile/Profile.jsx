import React, { useState } from 'react'

function ProfileForm() {
   const [profile, setProfile] = useState({
      firstName: '',
      middleName: '',
      email: '',
      password: '',
      confirmPassword: '',
   })

   const inputFields = [
      { name: 'firstName', label: 'Имя' },
      { name: 'middleName', label: 'Отчество' },
      { name: 'email', label: 'Email' },
      { name: 'password', label: 'Пароль' },
      { name: 'confirmPassword', label: 'Подтвердите пароль' },
   ]

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setProfile((prevProfile) => ({
         ...prevProfile,
         [name]: value,
      }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      // Обработка отправки формы
   }

   return (
      <div>
         <header
            style={{
               background:
                  'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
            }}
         >
            {/* Разноцветный фон header */}
         </header>
         <div className="profile">
            <img src="path/to/profile_image.jpg" alt="Profile" />{' '}
            {/* Замените path/to/profile_image.jpg на путь к вашему изображению профиля */}
         </div>
         <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
               <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}:</label>
                  <input
                     type="text"
                     id={field.name}
                     name={field.name}
                     value={profile[field.name]}
                     onChange={handleInputChange}
                  />
               </div>
            ))}
            <button type="submit">Сохранить</button>
         </form>
      </div>
   )
}

export default ProfileForm
