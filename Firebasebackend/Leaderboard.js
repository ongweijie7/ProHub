import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

//query for all user that have currentuser as a friend and then push their latest update into the leaderboard list

//updates the top 10 entries of the list whenever there are changes
const trackChanges = onSnapshot(doc(db, "Users", "ongweijie7@gmail.com"), (snapshot) => {
    console.log("changes are made");
});

export { trackChanges };
