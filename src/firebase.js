import firebase from 'firebase'

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
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app)

export const db = firebaseApp.firestore()