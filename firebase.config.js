import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA6-YRuxMUHgViwYTtyj5iukCb2ANiQeH4",
    authDomain: "firetodo-84805.firebaseapp.com",
    databaseURL: "https://firetodo-84805-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "firetodo-84805",
    storageBucket: "firetodo-84805.appspot.com",
    messagingSenderId: "791579429325",
    appId: "1:791579429325:web:3cbe1af741d0d893979c84",
    measurementId: "G-3FTJMQV7B5"
  };

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
