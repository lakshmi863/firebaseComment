import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Correct import

const firebaseConfig = {
  apiKey: "AIzaSyC-AbrsFvQeTzqUPdUfHI4vN5npEsJU48Y",
  authDomain: "comment-message.firebaseapp.com",
  projectId: "comment-message",
  storageBucket: "comment-message.appspot.com",
  messagingSenderId: "443076804090",
  appId: "1:443076804090:web:638d924e2cd47b9b6bb843",
  measurementId: "G-GLKVXCX6LM"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
