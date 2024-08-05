// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfZSBJQvB3CZLUqW1cznfYgNdHhyHukrg",
    authDomain: "pantry-70257.firebaseapp.com",
    projectId: "pantry-70257",
    storageBucket: "pantry-70257.appspot.com",
    messagingSenderId: "50463820402",
    appId: "1:50463820402:web:1cf755a4ef0cd939e110eb",
    measurementId: "G-60LMG941P1"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
export{app, firestore}