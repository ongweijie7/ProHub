import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot, query, where, collection, getDocs, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import global from '../global';

//initialising database
const db = getFirestore(firebaseApp);

{/*Query for a valid user and then add it to the current user's friend arr*/}
const acceptReq = (email) => {
    const docref = doc(db, "Users", email);

    getDoc(docref).then((snapshot) => {
        
        const given = snapshot.data().friends;
        const current = global.friends;
        
        //updating arr with friends' data
        const currentObject = {email: global.email, level: global.level, name: global.username, activities: global.activities};
        const givenObject = {email: snapshot.data().email, level: snapshot.data().level, name: snapshot.data().name, activities: snapshot.data().activities};
        given.push(currentObject);
        current.push(givenObject);

        //updating arr with friends emails
        const currentarr = global.friendemails;
        const givenarr = snapshot.data().friendemails;
        currentarr.push(snapshot.data().email);
        givenarr.push(global.email);

        //update current user's arr of request
        updateDoc(docref, {
            requests: arrayRemove(email),
        })
        

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
            
    }).catch((error) => {
        console.log(error.message);
    })
}

{/*Sends a request to the person with the given parameter email*/}
const sendReq = (email) => {
    const docref = doc(db, "Users", email);
    getDoc(docref).then((snapshot) => {
        if (snapshot.exists()) {
            const currentRequests = snapshot.data().requests;
            const currentFriends = snapshot.data().friendemails;

            if (currentFriends.indexOf(global.email) == -1) {
                if (currentRequests.indexOf(global.email) !== -1) {
                    alert("A friends request with this user is still pending");
                } else {
                    currentRequests.push(global.email);
                    updateDoc(docref, {
                    requests: currentRequests,
                    })
                }
            } else {
                alert("You have already added this user as a friend!");
            }
            
        } else {
            alert("User does not seem to exist");
        }
    }).catch((error) => {
        console.log(error.message);
    });
}

const deleteReq = (email) => {
    const docref = doc(db, "Users", global.email);

    //update current user's arr of request
    updateDoc(docref, {
        requests: arrayRemove(email),
    })
}

const deleteFriend = (email) => {
    const docref = doc(db, "Users", global.email);

    getDoc(docref).then((snapshot) => {
        if (snapshot.exists()) {
            const friendObjects = snapshot.data().friends;
            var newArr = friendObjects.filter((object) => object.email !== email);
            console.log(newArr);    
            //remove from friends emails array
            updateDoc(docref, {
                friendemails: arrayRemove(email),
                friends: newArr,
            })
        } else {
            alert("User does not seem to exist");
        }
    }).catch((error) => {
        console.log(error.message);
    });
}


export { acceptReq, sendReq, deleteReq, deleteFriend };