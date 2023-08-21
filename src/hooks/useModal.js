import { useSearchParams } from 'react-router-dom'

export const useModal = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const isActive = searchParams.get('isActive')
   const setActive = (whatIsActive) => {
      if (whatIsActive) {
         setSearchParams({ isActive: whatIsActive })
      } else {
         const removeAcive = searchParams.delete('isActive')
         setSearchParams(removeAcive)
      }
   }

   return { setActive, isActive }
}
