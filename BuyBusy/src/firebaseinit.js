// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj5TpHXyg-NfmFa_hmC6MYs35Mpqice_w",
  authDomain: "buybusy-ad304.firebaseapp.com",
  projectId: "buybusy-ad304",
  storageBucket: "buybusy-ad304.appspot.com",
  messagingSenderId: "499979405200",
  appId: "1:499979405200:web:db701762c2dd6c82a1d515"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore( app );
export default db;