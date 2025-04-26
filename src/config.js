import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAVK0Oj_7y-L6hMZo7VPA7ZvkB3UCBdqLQ",
    authDomain: "hw22-ce70d.firebaseapp.com",
    databaseURL: "https://hw22-ce70d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hw22-ce70d",
    storageBucket: "hw22-ce70d.firebasestorage.app",
    messagingSenderId: "13497489469",
    appId: "1:13497489469:web:06bfa17a4d8ed3ed797254",
    measurementId: "G-DP1Z0QD3NP"
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export {app};