import React, { useState } from 'react';
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { UpdateLevel } from './Firebasebackend/UpdateLevel';

//initialising database
const db = getFirestore(firebaseApp);

global.coins = 0;
global.username = "";
global.email = "hello"; //used to access the respective collection
global.leaderboard = [];
global.friends = []; //contains information about friends
global.friendemails = []; //used for querying for friends
global.level = 1;

const fullexp = (Math.floor(global.level / 10) + 1) * 50;

{/*Give exp to user*/}
global.updateCoins = (amount) => {
    const docref = doc(db, "Users", global.email);
    
    global.coins += amount;
    if (global.coins >= fullexp) {
        global.coins -= fullexp;
        global.level++;
        UpdateLevel();
    }
    updateDoc(docref, {
        coins: global.coins,
        level: global.level,
    })
}



export default global;