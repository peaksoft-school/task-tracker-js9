import { useSelector } from 'react-redux'
import { styled } from '@mui/material'
import Archivecard from './Archivecard'

export const Archive = () => {
   const { cardResponses } = useSelector((state) => state.archiveData.archive)

   return (
      <Container animation="slideIn">
         {cardResponses?.length > 0 ? (
            <>
               <P>Archived</P>
               {cardResponses.map((el) => (
                  <Archivecard key={el.id} el={el} />
               ))}
            </>
         ) : (
            <p
               style={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  color: '#888888',
               }}
            >
               No archive
            </p>
         )}
      </Container>
   )
}
const P = styled('p')({
   fontSize: '1rem',
   fontWeight: 600,
   textAlign: 'center',
   marginRight: '1.7rem',
   marginBottom: '1rem',
})

const Container = styled('div')(({ animation }) => {
   let animationStyles = {}
   switch (animation) {
      case 'slideIn':
         animationStyles = {
            animation: 'slideInAnimation 0.3s ease-in-out',
         }

         break
      default:
         break
   }
   return {
      width: '19.9rem',
      maxHeight: '89vh',
      borderRadius: '0.625rem',
      position: 'fixed',
      zIndex: '222',
      right: '2rem',
      padding: '0.5rem 0 0.5rem 0.5rem',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'height 0.3s',
      backgroundColor: 'white',
      overflowY: 'auto ',
      top: '5.5rem',
      background: '#FFF',
      scrollbarWidth: 'thin',
      scrollbarColor: ' #D9D9D9 transparent',
      ' &::-webkit-scrollbar ': {
         width: '0.5rem',
      },
      '&::-webkit-scrollbar-track': {
         backgroundColor: 'transparent',
      },
      ' &::-webkit-scrollbar-thumb ': {
         backgroundColor: ' #D9D9D9',
         borderRadius: '0.25rem',
      },

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
   }
})
