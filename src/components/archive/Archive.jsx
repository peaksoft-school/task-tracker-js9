import { useSelector } from 'react-redux'

import Archivecard from './Archivecard'

export const Archive = () => {
   const { cardResponses, columnResponses } = useSelector(
      (state) => state.archiveData.archive
   )
   console.log('columnResponses: ', columnResponses)
   console.log('cardResponses : ', cardResponses)

   return (
      <div>
         {cardResponses?.map((el) => (
            <Archivecard el={el} />
         ))}
      </div>
   )
}
