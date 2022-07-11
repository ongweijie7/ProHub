import React, { useState } from 'react';
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

global.coins = 0;
global.username = "";
global.email = "hello" //used to access the respective collection
global.leaderboard = [];
global.friends = []

global.updateCoins = (amount) => {
    const docref = doc(db, "Users", global.email);
    console.log(docref);
    global.coins += amount;
    updateDoc(docref, {
        coins: global.coins,
    })
}

export default global;