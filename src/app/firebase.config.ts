import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDi1bWZiLq6yoCtrJzM0o2WrVW2UDg58Ng",
  authDomain: "travellingnow-51ace.firebaseapp.com",
  projectId: "travellingnow-51ace",
  storageBucket: "travellingnow-51ace.firebasestorage.app",
  messagingSenderId: "1088225912225",
  appId: "1:1088225912225:web:5c37bf9b55ee2e6d27d7e0"
};

export const appFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(appFirebase);