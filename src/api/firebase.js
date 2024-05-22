import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCB3SG4OskFpYa9oYTsfkq7iC-eWm0nz0Q",
  authDomain: "code-reelers.firebaseapp.com",
  projectId: "code-reelers",
  storageBucket: "code-reelers.appspot.com",
  messagingSenderId: "978982155354",
  appId: "1:978982155354:web:ec7b9cb25f8eb0587d9463",
  measurementId: "G-Q5XLRMTNQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);
export { db, store };