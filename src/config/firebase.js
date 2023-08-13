import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyCnvXwYctqcxw-e--S8QTT9Sh8VBi4ZNW0',
   authDomain: 'auth-with-1b3a7.firebaseapp.com',
   projectId: 'auth-with-1b3a7',
   storageBucket: 'auth-with-1b3a7.appspot.com',
   messagingSenderId: '1062608586685',
   appId: '1:1062608586685:web:7e6a3a5935b0211c5b34d4',
   measurementId: 'G-VS2QWVNLY3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }
