import firebase from "firebase"; 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMJ9wmlsVZVVYpkX_MgDxGHEQCMDcxwd4",
    authDomain: "app-30644.firebaseapp.com",
    projectId: "app-30644",
    storageBucket: "app-30644.appspot.com",
    messagingSenderId: "97319430939",
    appId: "1:97319430939:web:87f7aa52f01772cc1801be",
    measurementId: "G-QSPBBJ4NX1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();


export { db, auth };