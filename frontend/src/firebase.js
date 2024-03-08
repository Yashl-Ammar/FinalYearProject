// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-ej7fA6foQt3-xPiNrjcgD3sz579F1w",
  authDomain: "chatting-da258.firebaseapp.com",
  projectId: "chatting-da258",
  storageBucket: "chatting-da258.appspot.com",
  messagingSenderId: "1007838127620",
  appId: "1:1007838127620:web:24ce40af8250ca95a1b751",
  measurementId: "G-BSYLZG5BDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);