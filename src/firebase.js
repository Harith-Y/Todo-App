// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGELXI1CwE4Jv2zExC75faqCBBgpnUaCg",
  authDomain: "vue3-todo-practice-app.firebaseapp.com",
  projectId: "vue3-todo-practice-app",
  storageBucket: "vue3-todo-practice-app.firebasestorage.app",
  messagingSenderId: "240877767003",
  appId: "1:240877767003:web:d7768c42fcfa618827b27e",
  measurementId: "G-NS19FHC37E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };