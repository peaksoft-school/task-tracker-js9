import { Sidenav } from '../components/sidebar/Sidenav'
import { Column } from '../components/column/Column'
import { data, dataLength, workspacedata } from '../utils/constants/general'
import { LayoutMenu } from '../components/LayouMenu/LayoutMenu'

export const InnerPage = () => {
   return (
      <div style={{ display: 'flex' }}>
         <Sidenav
            data={data}
            dataLength={dataLength}
            workspacedata={workspacedata}
         />
         <div>
            <LayoutMenu />
            <Column />
         </div>
      </div>
   )
}
