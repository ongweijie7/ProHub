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
global.friends = [];
global.level = 1;

const fullexp = (Math.floor(global.level / 10) + 1) * 50;

{/*Give exp to user*/}
global.updateCoins = (amount) => {
    const docref = doc(db, "Users", global.email);
    console.log(docref);
    global.coins += amount;
    if (global.coins >= fullexp) {
        global.coins -= fullexp;
        global.level++;
    }
    updateDoc(docref, {
        coins: global.coins,
        level: global.level,
    })
}

{/*Give xp to user*/}


export default global;