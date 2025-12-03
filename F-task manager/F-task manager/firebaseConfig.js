// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy3Io1DtChV-IAesD4k63OnHl8pvWr7aw",
  authDomain: "fir-demo-555f1.firebaseapp.com",
  projectId: "fir-demo-555f1",
  storageBucket: "fir-demo-555f1.firebasestorage.app",
  messagingSenderId: "891968216814",
  appId: "1:891968216814:web:0651ea82b1ec9031b61dff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };