import { Photos } from './components/photoColor/Photo'
import { photos } from './utils/constants/general'

function App() {
   return (
      <div>
         <Photos boards={photos} />
      </div>
   )
}

export default App
