// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d0d84.firebaseapp.com",
  projectId: "mern-blog-d0d84",
  storageBucket: "mern-blog-d0d84.appspot.com",
  messagingSenderId: "706253424065",
  appId: "1:706253424065:web:08ba195e792b3772d4db40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);