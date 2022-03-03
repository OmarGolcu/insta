// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKIGVvCA8zZYYnRz4prsoHhKjBTno6UUo",
  authDomain: "inst-2-339de.firebaseapp.com",
  projectId: "inst-2-339de",
  storageBucket: "inst-2-339de.appspot.com",
  messagingSenderId: "74021957828",
  appId: "1:74021957828:web:efc056ac1cdc5fb20e1991"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) :getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage}