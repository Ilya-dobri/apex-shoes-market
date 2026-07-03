import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7TiJjIF0Lo7Unrtrx4Co0qFFUGMfY20c",
  authDomain: "apex-store-for-shoes.firebaseapp.com",
  projectId: "apex-store-for-shoes",
  storageBucket: "apex-store-for-shoes.firebasestorage.app",
  messagingSenderId: "69047670255",
  appId: "1:69047670255:web:e0b9c61fa93c6986c1d21a",
  measurementId: "G-7T6S9H46FR"
};

// Инициализируем само приложение Firebase
const app = initializeApp(firebaseConfig);

// Инициализируем и экспортируем ТОЛЬКО базу данных
export const db = getFirestore(app);
export const auth = getAuth(app);