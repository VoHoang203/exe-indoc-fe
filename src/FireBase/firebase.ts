// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjMVHSNtf062dmsj9qxyw5c3sVfof7-Y8",
  authDomain: "indocs-d6d75.firebaseapp.com",
  projectId: "indocs-d6d75",
  storageBucket: "indocs-d6d75.appspot.com",
  messagingSenderId: "570770871175",
  appId: "1:570770871175:web:dd7d62e832259320353922",
  measurementId: "G-L8P0R80KW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export {fireStore,auth,storage, app}