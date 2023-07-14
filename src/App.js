import { PhotoColor } from './components/photoColor/PhotoColor'
import { colors } from './utils/constants/general'

function App() {
   return (
      <div>
         <PhotoColor boards={colors} />
      </div>
   )
}

export default App
