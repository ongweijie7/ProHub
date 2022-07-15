import React, { useState } from 'react';
import { firebaseApp } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, query, collection, getDocs, where} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

const UpdateLevel = async () => {
    const docref = doc(db, "Users", global.email);
    let currentlv;
    getDoc(docref).then((ss) => {
        currentlv = ss.data().level;
        console.log(currentlv);
        updateDoc(docref, {
            level: currentlv,
        })
    })

    //update the level in all friend's arr through a query
    const userObject = {email: global.email, level: global.level, name: global.name};
    const q = query(collection(db, "Users"), where("friendemails", "array-contains", global.email));
    const qSnapShot = await getDocs(q);
    qSnapShot.forEach((doc1) => {
        const userEmail = doc1.data().email;
        const docref = doc(db, "Users", userEmail);
        console.log(userEmail);
        getDoc(docref).then((ss) => {
            const friendsarr = ss.data().friends;
            let user = friendsarr.find(item => item.email === global.email);
            user.level = global.level;
            console.log(user.level);
            updateDoc(docref, {
                friends : friendsarr,
            })

        })

    })
}

export { UpdateLevel };
