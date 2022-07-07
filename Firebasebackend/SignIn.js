import { firebaseApp } from "../firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';


//initialising database
const db = getFirestore(firebaseApp);

export default function SignIn(emailAddress) { 
    const docref = doc(db, "Users", emailAddress);
    getDoc(docref).then(docSnap => {
        if (docSnap.exists()) {
            global.email = emailAddress;
            global.username = docSnap.data().Name;
            global.coins = docSnap.data().Coins;
            console.log(docSnap.data());
        } else {
            console.log("no such document")
        }
    })
    
}