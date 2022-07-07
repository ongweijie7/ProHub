import { firebaseApp } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

{/*creating User document*/}
export default function CreateAcc(email, name) {
    global.coins = 0;
    global.email = email;
    global.username = name;
    const userRef = doc(db, "Users", email);
    setDoc(userRef, {
        Coins: 0,
        Name: name, 
    });
}

