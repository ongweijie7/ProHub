import React, { useState } from 'react';
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { updateLeaderboards } from './Firebasebackend/LeaderboardBackend';

//initialising database
const db = getFirestore(firebaseApp);

global.coins = 0;
global.username = "";
global.email = "hello"; //used to access the respective collection
global.leaderboard = [];
global.friends = [];
global.level = 1;

const fullexp = (Math.floor(global.level / 10) + 1) * 50;

{/*Give exp to user*/}
global.updateCoins = (amount) => {
    const docref = doc(db, "Users", global.email);
    
    global.coins += amount;
    if (global.coins >= fullexp) {
        global.coins -= fullexp;
        global.level++;
        updateLeaderboards(global.level);
    }
    updateDoc(docref, {
        coins: global.coins,
        level: global.level,
    })
}

{/*Upda*/}


export default global;