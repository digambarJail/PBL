// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pict-connect-2a16b.firebaseapp.com",
  projectId: "pict-connect-2a16b",
  storageBucket: "pict-connect-2a16b.appspot.com",
  messagingSenderId: "106655362355",
  appId: "1:106655362355:web:530415c41909bf8522e246"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);