import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCOQrX72y9PSIOmcKY9u_eLg09-XrO05HE",
    authDomain: "dh2642iprog-project.firebaseapp.com",
    databaseURL: "https://dh2642iprog-project.firebaseio.com",
    projectId: "dh2642iprog-project",
    storageBucket: "dh2642iprog-project.appspot.com",
    messagingSenderId: "760343964405",
    appId: "1:760343964405:web:61885104fa77df2591b3bc",
    measurementId: "G-PNJEXD30BW"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();

