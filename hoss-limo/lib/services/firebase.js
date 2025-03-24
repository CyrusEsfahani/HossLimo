"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Firestore
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
// Initialize Auth
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
