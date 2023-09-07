import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArchive } from '../../store/getArchive/archiveThunk'
import Archivecard from './Archivecard'

export const Archive = () => {
   const { archive } = useSelector((state) => state.archiveData)
   console.log('archive: ', archive)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getArchive(5))
   }, [dispatch])

   return (
      <div>
         <Archivecard />
         {/* {archive?.cardResponses?.map((el) => (
            <Card cardId={el.cardId} title={el.title} />
         ))} */}

         <h1>Archive</h1>
         <h2>Archive</h2>
         <h3>Archive</h3>
         <h4>Archive</h4>
         <h5>Archive</h5>
         <h6>Archive</h6>
      </div>
   )
}
