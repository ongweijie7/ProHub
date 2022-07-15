import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot, query, where, collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

{/*Query for a valid user and then add it to the current user's friend arr*/}
const addUser = (email) => {
    const docref = doc(db, "Users", email);
    getDoc(docref).then((snapshot) => {
        if (snapshot.exists()) {
            const given = snapshot.data().friends;
            const current = global.friends;
            if (given.indexOf(global.email) == -1) {
                //updating arr with friends' data
                const currentObject = {email: global.email, level: global.level, name: snapshot.data().name};
                const givenObject = {email: snapshot.data().email, level: snapshot.data().level, name: snapshot.data().name};
                given.push(currentObject);
                current.push(givenObject);

                //updating arr with friends emails
                const currentarr = global.friendemails;
                const givenarr = snapshot.data().friendemails;
                currentarr.push(snapshot.data().email);
                givenarr.push(global.email);

                //update friend list of given email
                updateDoc(docref, {
                    friends: given,
                    friendemails: givenarr,
                })
                //update friend list of curent user
                updateDoc(doc(db, "Users", global.email), {
                    friends: current,
                    friendemails: currentarr,
                })
            } else {
                alert("You have already added this user!!");
            }
        } else {
            alert("User does not seem to exist! Please enter a valid user email");
        }
    }).catch((error) => {
        console.log(error.message);
    })
}

export { addUser };