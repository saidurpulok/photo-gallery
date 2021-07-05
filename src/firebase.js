import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBEfUnkJoDpkf8-TEYNepRr7w9QRZNhGcc",
    authDomain: "photos-77.firebaseapp.com",
    databaseURL: "https://photos-77-default-rtdb.firebaseio.com",
    projectId: "photos-77",
    storageBucket: "photos-77.appspot.com",
    messagingSenderId: "1029024055444",
    appId: "1:1029024055444:web:54fdec9f34335d2942f481",
    measurementId: "G-HVRJKN3EX3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

