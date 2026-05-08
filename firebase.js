// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGi4MIBDcs5Z3DtPYfEWzKH0c9P19ORC0",
  authDomain: "stationery-hub-80895.firebaseapp.com",
  projectId: "stationery-hub-80895",
  storageBucket: "stationery-hub-80895.firebasestorage.app",
  messagingSenderId: "368432976126",
  appId: "1:368432976126:web:71361a16bfd3ae178dd5af",
  measurementId: "G-WVCYH8K55P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);

// Export
export { db, auth };
