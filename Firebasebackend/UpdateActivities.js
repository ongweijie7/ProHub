import { firebaseApp } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, query, collection, getDocs, where} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

const UpdateActivities = async (hours, minutes) => {
    const docref = doc(db, "Users", global.email);

    const act = `${global.username} just focused for ${hours} hours and ${minutes} minutes!!`

    let currentAct;

    getDoc(docref).then((ss) => {
        currentAct = ss.data().activities;

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

    const q = query(collection(db, "Users"), where("friendemails", "array-contains", global.email));
    const qSnapShot = await getDocs(q);
    qSnapShot.forEach((doc1) => {
        const userEmail = doc1.data().email;
        const docref = doc(db, "Users", userEmail);
        getDoc(docref).then((ss) => {
            const friendsarr = ss.data().friends;
            let user = friendsarr.find(item => item.email === global.email);
            user.activities = currentAct;
            updateDoc(docref, {
                friends : friendsarr,
            })

        })

    })
}

export { UpdateActivities };