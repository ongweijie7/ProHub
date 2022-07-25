import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot, query, where, collection, getDocs, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

const editCalendar = (newCalendar) => {
    const docref = doc(db, "Users", global.email);

    updateDoc(docref, {
        calendar: newCalendar,
    })

}

const loadCalendar = () => {
    const docref = doc(db, "Users", global.email);
    let calendar1;

    getDoc(docref).then((snapshot) => {
        if (snapshot.exists()) {
            calendar1 = snapshot.data().calendar;
            console.log("hello");
            console.log(calendar1);
        } else {
            alert("User does not seem to exist");
        }
    }).catch((error) => {
        console.log(error.message);
    });

    
    return calendar1;
}

export { editCalendar, loadCalendar };