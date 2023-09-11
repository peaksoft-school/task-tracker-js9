import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArchive } from '../../store/getArchive/archiveThunk'
import Archivecard from './Archivecard'

export const Archive = () => {
   const cardResponses = useSelector((state) => state?.archiveData)
   console.log('cardResponses : ', cardResponses)

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getArchive(5))
   }, [dispatch])

   return (
      <div>
         <Archivecard />
      </div>
   )
}
