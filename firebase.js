// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo0ahTztpNMeXpfuNGZwnZhL67nBkZqzY",
  authDomain: "dating-chat-50993.firebaseapp.com",
  projectId: "dating-chat-50993",
  storageBucket: "dating-chat-50993.appspot.com",
  messagingSenderId: "563765868940",
  appId: "1:563765868940:web:1c685d9cffe43ab0fa7ea9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
