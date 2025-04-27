// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5lnMhxyoW_WnTL6l5P5onhJ-IbuN2jeQ",
  authDomain: "projectestatemern-2ec11.firebaseapp.com",
  projectId: "projectestatemern-2ec11",
  storageBucket: "projectestatemern-2ec11.appspot.com",
  messagingSenderId: "1068271095690",
  appId: "1:1068271095690:web:49eb23b9203666dd6fc273",
  measurementId: "G-BDPE9M4F59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
export { app, auth, storage };
