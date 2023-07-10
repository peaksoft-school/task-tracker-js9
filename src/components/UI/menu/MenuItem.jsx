import { styled } from '@mui/material'

export const MenuItem = ({ children, animation, ...props }) => {
   return (
      <MenuWrapper animation={animation} {...props}>
         {children}
      </MenuWrapper>
   )
}

const MenuWrapper = styled('div')(({ animation, ...props }) => {
   let animationStyles = {}

   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }
         break
      case 'fadeIn':
         animationStyles = {
            animation: 'fadeInAnimation 0.3s ease-in-out',
         }
         break
      // Другие случаи анимации

      default:
         break
   }

   return {
      width: props.width,
      height: props.height,
      position: 'absolute',
      ...animationStyles,

      '@keyframes slideInAnimation': {
         '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
         },
         '100%': {
            transform: 'translateX(0)',
            opacity: 1,
         },
      },

      '@keyframes fadeInAnimation': {
         '0%': {
            opacity: 0,
         },
         '100%': {
            opacity: 1,
         },
      },
   }
})
