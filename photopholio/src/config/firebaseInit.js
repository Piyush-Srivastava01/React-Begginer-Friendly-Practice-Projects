import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD7psP9FZZBo1A-_qpwIrBw0qijNF-gGg",
  authDomain: "photofolio-c4820.firebaseapp.com",
  projectId: "photofolio-c4820",
  storageBucket: "photofolio-c4820.appspot.com",
  messagingSenderId: "758883298016",
  appId: "1:758883298016:web:a5f8206420129e23c7fe85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export default db;