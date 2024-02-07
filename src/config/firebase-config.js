// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxYmFPUKEJL9fj21oPph3l_ELWFjPdqV0",
  authDomain: "expense-tracker-e2301.firebaseapp.com",
  projectId: "expense-tracker-e2301",
  storageBucket: "expense-tracker-e2301.appspot.com",
  messagingSenderId: "508189227135",
  appId: "1:508189227135:web:87f818e65fb7f2a8f8274a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
