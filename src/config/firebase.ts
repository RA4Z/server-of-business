// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3pN2a8xZEbxmhpZ-XVcJYJ-jsh87ut5g",
    authDomain: "server-of-business.firebaseapp.com",
    projectId: "server-of-business",
    storageBucket: "server-of-business.appspot.com",
    messagingSenderId: "272108888489",
    appId: "1:272108888489:web:581e39b679b9d3cb9424b8",
    measurementId: "G-JJCYGM15HJ",
    databaseURL: "https://server-of-business-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa o Firestore
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
const database = getDatabase(app);

export { db, storage, auth, database, analytics };