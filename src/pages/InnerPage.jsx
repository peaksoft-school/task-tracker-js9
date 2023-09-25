import React from 'react'
import { useSelector } from 'react-redux'
import { Sidenav } from '../components/sidebar/Sidenav'
import { Column } from '../components/column/Column'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { LayoutMenu } from '../components/LayouMenu/LayoutMenu'

export const InnerPage = () => {
   const { boardById } = useSelector((state) => state.board)

   const pageStyles = {
      display: 'flex',
      width: '100%',
      height: '100vh',
   }

   if (boardById.backGround) {
      if (boardById.backGround.startsWith('http')) {
         pageStyles.backgroundImage = `url(${boardById.backGround})`
         pageStyles.backgroundSize = 'cover'
         pageStyles.backgroundPosition = 'center center'
      } else {
         pageStyles.backgroundColor = boardById.backGround
      }
   }

   return (
      <div style={pageStyles}>
         <Sidenav
            data={data}
            dataLength={dataLength}
            workspacedata={workspacedata}
         />
         <div
            style={{
               width: '100%',
               overflow: 'hidden',
            }}
         >
            <LayoutMenu />
            <Column />
         </div>
      </div>
   )
}
