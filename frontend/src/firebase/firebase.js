import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY-S6h813Dq0KVqm72VwAbnOmsu3XgSs4",

  authDomain: "shop-fb4b0.firebaseapp.com",

  databaseURL: "https://shop-fb4b0-default-rtdb.firebaseio.com",

  projectId: "shop-fb4b0",

  storageBucket: "shop-fb4b0.appspot.com",

  messagingSenderId: "516336009735",

  appId: "1:516336009735:web:480b6c4a7f24fc8de2e0a2",

  measurementId: "G-HLLMK9R9TQ"

  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app); 
export default app;