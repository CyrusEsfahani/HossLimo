import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUb_aHjrCb24QcCn0uP1EyiYz-5vd9g9Q",
    authDomain: "hoss-limo.firebaseapp.com",
    projectId: "hoss-limo",
    storageBucket: "hoss-limo.firebasestorage.app",
    messagingSenderId: "396112355349",
    appId: "1:396112355349:web:05ef4b1a2022b92a0aae1c",
    measurementId: "G-P6MZDQPBSJ"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };