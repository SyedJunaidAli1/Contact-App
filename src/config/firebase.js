// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyL90aqVGiMbVDtd7wTKwLlp_EWQPFR6s",
  authDomain: "vite-contact-a665b.firebaseapp.com",
  projectId: "vite-contact-a665b",
  storageBucket: "vite-contact-a665b.appspot.com",
  messagingSenderId: "841972066768",
  appId: "1:841972066768:web:ff70d39196a38a83b471d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)