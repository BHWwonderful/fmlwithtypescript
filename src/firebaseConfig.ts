import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC_nNA5R7fHXt0xTpvjNAM6vtn3ut4d6f0",
  authDomain: "fmlwithtypescript.firebaseapp.com",
  projectId: "fmlwithtypescript",
  storageBucket: "fmlwithtypescript.appspot.com",
  messagingSenderId: "159538387361",
  appId: "1:159538387361:web:3a12771736d60e87e593e0",
  measurementId: "G-52V5ZFLQTG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;