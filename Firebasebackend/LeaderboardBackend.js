import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot, query, where, collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

//query for all user that have currentuser as a friend and then push their latest update into the leaderboard list

{/*Detect whenever there are changes*/}
// const trackChanges = onSnapshot(doc(db, "Users", "ongweijie7@gmail.com"), (snapshot) => {
//     console.log("changes are made");
// });

{/*Update the different leaderboards of user's friends*/}
const updateLeaderboards = (level) => {
    const docref = doc(db, "Users", global.email);
    getDoc(docref).then((snapshot) => {
        const leaderboardArr = snapshot.data().leaderboard;
        const achievement = `${global.username} just reach ${level}!!`;
        leaderboardArr.push(achievement);
        updateDoc(docref, {
            leaderboard: leaderboardArr,
        })
    }).catch((error) => {
        console.log(error.message);
    })
}

export { updateLeaderboards };
