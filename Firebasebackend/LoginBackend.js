import { firebaseApp } from "../firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';


//initialising database
const db = getFirestore(firebaseApp);

export default async function SignIn(email) { 
    const docref = doc(db, "Users", email);
    getDoc(docref).then(docSnap => {
        if (docSnap.exists()) {
            global.email = email;
            global.username = docSnap.data().name;
            global.coins = docSnap.data().coins;
            global.leaderboard = docSnap.data().leaderboard; 
            global.friends = docSnap.data().friends;
            global.level = docSnap.data().level;
            global.friendemails = docSnap.data().friendemails;
            global.activities = docSnap.data().activities;
        } else {
            console.log("no such document")
        }
    })
    
}