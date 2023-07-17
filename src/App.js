import { CommentSectoin } from './components/UI/comments/CommentsSection'
import { comments } from './utils/constants/comments'

function App() {
   return (
      <div>
         <h1>Task-tracker </h1>
         <CommentSectoin comments={comments} />
      </div>
   )
}

export default App
