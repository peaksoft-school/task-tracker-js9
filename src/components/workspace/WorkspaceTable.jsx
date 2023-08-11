import { Avatar, IconButton, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import React, { useEffect, useState } from 'react'
import { StarIcon } from '../../assets/icons'
import TableMui from '../UI/table/TableMui'
import {
   fetchAllWorkspaces,
   getWorkspacebyId,
} from '../../store/workspace/workspaceThunk'

export const WorkspaceTable = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [favoriteIds, setFavoriteIds] = useState([])
   const { workspaces } = useSelector((state) => state.workspaces)

   const isFavorite = (id) => favoriteIds.includes(id)

   const toggleFavorite = (id) => {
      setFavoriteIds((prevIds) =>
         prevIds.includes(id)
            ? prevIds.filter((favId) => favId !== id)
            : [...prevIds, id]
      )
   }
   console.log(workspaces)

   const getWorkSpaceById = (id) => {
      dispatch(getWorkspacebyId({ id, navigate, path: 'boards' }))
   }

   useEffect(() => {
      dispatch(fetchAllWorkspaces())
   }, [dispatch])

   const column = [
      {
         heading: '№',
         key: 'workSpaceId',
         index: true,
         align: 'left',
         minWidth: '5rem',
         render: (data) => <h3>{data.workSpaceId}</h3>,
      },
      {
         heading: 'Name',
         key: 'adminFullName',
         minWidth: '15rem',
         render: (data) => (
            <NameStyle onClick={() => getWorkSpaceById(data.workSpaceId)}>
               {data.adminFullName}
            </NameStyle>
         ),
      },
      {
         heading: 'Lead',
         key: 'lead',
         render: (data) => (
            <div
               style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
               <Avatar src={data.adminImage} />
               <p>{data.adminFullName}</p>
            </div>
         ),
      },
      {
         heading: 'Action',
         key: 'action',
         align: 'right',
         render: (data) => (
            <IconButton onClick={() => toggleFavorite(data.id)}>
               {isFavorite(data.id) ? (
                  <StarIcon fill="#0079BF" />
               ) : (
                  <StarIcon fill="#B2B2B2" />
               )}
            </IconButton>
         ),
      },
   ]

   return (
      <div>
         <TableMui column={column} rows={workspaces} />
      </div>
   )
}

const NameStyle = styled('h3')`
   color: #000;
   font-family: CarePro;
   font-size: 1rem;
   font-style: normal;
   font-weight: bold;
   line-height: normal;
   height: 3.4rem;
   display: flex;
   align-items: center;
   text-decoration: underline;
   cursor: pointer;
   color: #0073de;
`
