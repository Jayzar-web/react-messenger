import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: 'AIzaSyCA6sHBsI20c4C55tAeTDWCXbmbFVAjPFg',
  authDomain: 'flux-messenger-58c3e.firebaseapp.com',
  projectId: 'flux-messenger-58c3e',
  storageBucket: 'flux-messenger-58c3e.appspot.com',
  messagingSenderId: '435646473451',
  appId: '1:435646473451:web:dd518a01401ce7831d0aae',
  measurementId: 'G-BS8MHGP7G1',
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
