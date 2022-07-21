import { firebaseApp } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, query, collection, getDocs, where} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

const UpdateActivities = (hours, minutes) => {
    const docref = doc(db, "Users", global.email);

    const act = `${global.username} just focused for ${hours} hours and ${minutes} minutes!!`

    getDoc(docref).then((ss) => {
        const currentAct = ss.data().activities;

        if (currentAct.length > 5) {
            currentAct.pop();
            currentAct.unshift(act);
        } else {
            currentAct.unshift(act);
        }

        updateDoc(docref, {
            activities: currentAct,
        })
    })

}

export { UpdateActivities };