import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth, GoogleAuthProvider } from '@firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBQmjx-we-3ZCHG5mUAWcxrjts0SelLpdE',
  authDomain: 'react-todo-app-7ac51.firebaseapp.com',
  projectId: 'react-todo-app-7ac51',
  storageBucket: 'react-todo-app-7ac51.appspot.com',
  messagingSenderId: '412098075147',
  appId: '1:412098075147:web:0679928822d845677bc50e',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const loginProvider = new GoogleAuthProvider()
