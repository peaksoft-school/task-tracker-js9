import { Notification } from './components/UI/notification/Notification'
import { notificationsPanel } from './utils/constants/notification'

function App() {
   return (
      <div>
         {/* <h1>Task-tracker</h1> */}
         <Notification notificationsPanel={notificationsPanel} />
      </div>
   )
}

export default App
