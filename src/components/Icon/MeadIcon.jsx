import React from 'react'

export const MeadIcon = ({ onClick }) => {
   return (
      <button
         style={{
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            border: 'none',
         }}
         onClick={onClick}
         type="button"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
         >
            <path
               d="M4.5 14.25C3.25736 14.25 2.25 13.2426 2.25 12C2.25 10.7574 3.25736 9.75 4.5 9.75C5.74264 9.75 6.75 10.7574 6.75 12C6.75 13.2426 5.74264 14.25 4.5 14.25ZM12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25ZM19.5 14.25C18.2574 14.25 17.25 13.2426 17.25 12C17.25 10.7574 18.2574 9.75 19.5 9.75C20.7426 9.75 21.75 10.7574 21.75 12C21.75 13.2426 20.7426 14.25 19.5 14.25Z"
               fill="#111111"
            />
         </svg>
      </button>
   )
}
