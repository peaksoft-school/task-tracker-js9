import { Avatar, IconButton, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'
import { StarIcon } from '../../assets/icons'
import TableMui from '../UI/table/TableMui'
import {
   addWorkspaceToFavorites,
   fetchAllWorkspaces,
   getWorkspacebyId,
} from '../../store/workspace/workspaceThunk'

export const WorkspaceTable = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { workspaces } = useSelector((state) => state.workspaces)
   console.log('workspaces:', workspaces)

   const getWorkSpaceByIdHandler = (workspaceData) => {
      dispatch(getWorkspacebyId({ workspaceData, navigate, path: 'boards' }))
   }
   const addtoFavouriteHandler = (workspaceId) => {
      dispatch(addWorkspaceToFavorites(workspaceId))
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
         key: 'workSpaceName',
         minWidth: '15rem',
         render: (workspaceData) => (
            <NameStyle onClick={() => getWorkSpaceByIdHandler(workspaceData)}>
               {workspaceData.workSpaceName}
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
            <IconButton>
               {data?.isFavorite ? (
                  <StarIcon
                     fill="#0079BF"
                     onClick={() => addtoFavouriteHandler(data.workSpaceId)}
                  />
               ) : (
                  <StarIcon
                     fill="#B2B2B2"
                     onClick={() => addtoFavouriteHandler(data.workSpaceId)}
                  />
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
