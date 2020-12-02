import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyALuzAm03buerT-oxeALHaQ37KJ3-mlWwU",
    authDomain: "uniquiz-e9d1f.firebaseapp.com",
    databaseURL: "https://uniquiz-e9d1f.firebaseio.com/",
    projectId: "uniquiz-e9d1f",
    storageBucket: "uniquiz-e9d1f.appspot.com",
    messagingSenderId: "686495982031",
    appId: "1:686495982031:web:d547762be1611f7d42b2ba",
    measurementId: "G-XQ99NH3C47"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth;
export {database, auth};
    // Set the configuration for your app
  // TODO: Replace with your project's config object