import { Sidenav } from './components/sidebar/Sidenav'
import { data, workspacedata } from './utils/helpers/Helpers'

function App() {
   return (
      <div>
         <Sidenav data={data} workspacedata={workspacedata} />
         <h1>Task Tracker</h1>
      </div>
   )
}
export default App
