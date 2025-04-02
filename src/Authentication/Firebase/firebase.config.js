// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY-ymiNCLC8PIYsDnuoXh4bMst87yixao",
  authDomain: "bistro-boss-d24ed.firebaseapp.com",
  projectId: "bistro-boss-d24ed",
  storageBucket: "bistro-boss-d24ed.appspot.com", // Fixed bucket name and removed space
  messagingSenderId: "714109379201",
  appId: "1:714109379201:web:50e1a42814d594fb9fe380"
};

// Initialize Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error", error);
}

// Export auth and app for potential other uses
export { auth, app };