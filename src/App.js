import { Favourite } from './components/favourite/Favourite'
import { favourites } from './utils/constants/favourites'

function App() {
   return (
      <div>
         <Favourite favourite={favourites} />
      </div>
   )
}

export default App
