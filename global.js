import React, { useState } from 'react';
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { UpdateLevel } from './Firebasebackend/UpdateLevel';
import { refresh } from './screens/Leaderboard';


//initialising database
const db = getFirestore(firebaseApp);

global.XP = 0;
global.username = "";
global.email = "hello"; //used to access the respective collection
global.leaderboard = [];
global.friends = []; //contains information about friends
global.friendemails = []; //used for querying for friends
global.level = 1;
global.activities = [] //used for showing recent activities of user
global.calendar = null //used to keep track of events

const fullexp = (Math.floor(global.level / 10) + 1) * 50;

{/*Give exp to user*/}
global.updateCoins = (amount) => {
    const docref = doc(db, "Users", global.email);
    
    global.XP += amount;
    if (global.XP >= fullexp) {
        global.XP -= fullexp;
        global.level++;
        console.log(global.level);
        refresh();
        UpdateLevel();
        
    }
    updateDoc(docref, {
        coins: global.XP,
        level: global.level,
    })
}

global.signOut = () => {
    global.XP = 0;
    global.username = "";
    global.email = "hello"; //used to access the respective collection
    global.leaderboard = [];
    global.friends = []; //contains information about friends
    global.friendemails = []; //used for querying for friends
    global.level = 1;
    global.activities = [] //used for showing recent activities of user
}



export default global;