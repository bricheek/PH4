import { initializeApp } from 'firebase/app';
import * as admin from 'firebase-admin';
import serviceAccount from './src/service-account-key.json'

export const fbadmin = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))
})  
  
const firebaseConfig = {
    apiKey: "AIzaSyD_Utt2UBIZG0NGPoJ7DNj-qpoAAeFZkyg",
    authDomain: "phfb-7aa87.firebaseapp.com",
    projectId: "phfb-7aa87",
    storageBucket: "phfb-7aa87.appspot.com",
    messagingSenderId: "343197799754",
    appId: "1:343197799754:web:db725c5eb86777774f1db3",
    measurementId: "G-TWZYRYW8C4",
  };
  export const fbapp = initializeApp(firebaseConfig)