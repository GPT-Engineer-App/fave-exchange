// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLspPreZIlDHoK6D0BDInsLTNBio_QzOA",
  authDomain: "firstsee-cb8d8.firebaseapp.com",
  databaseURL: "https://firstsee-cb8d8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firstsee-cb8d8",
  storageBucket: "firstsee-cb8d8.appspot.com",
  messagingSenderId: "972127925585",
  appId: "1:972127925585:web:622d765de1843ad4f30f70",
  measurementId: "G-MX44J7E1YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);