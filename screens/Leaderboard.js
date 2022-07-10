import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import global from '../global';
import { trackChanges } from '../Firebasebackend/Leaderboard';

import { firebaseApp } from "../firebase.config";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);


const LeaderBoard = () => {
    const [arr, setarr] = useState(global.leaderboard);

    console.log(global.email);

    // const docref = doc(db, "Users", "ongweijie7@gmail.com");
    const docref = doc(db, "Users", global.email);

    const add = () => {
        updateDoc(docref, {
            Name: "hello",
        })
        setarr(global.leaderboard);
    }
    //doesnt seem to be loading the relevant detaits -> cannot find snapshot
    useEffect(() => {
        let leaderboard = [];
        getDoc(docref).then((snapshot) => {
            if (snapshot.exists()){
                leaderboard = snapshot.data().Leaderboard;
            } else {
                console.log("no such document")
            }
        }).then(() => {
        setarr(leaderboard);
        })
      }, []);
    
    
    trackChanges;
    
    return (
        <View style={styles.container}>
            {/* <MaterialIcons name="leaderboard" size={75} color="#ccc" />
            <Text style={styles.text}>Imagine a leaderBoard</Text> */}
            <FlatList
                data={arr}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )}
            />
            <Button onPress={add} title={"Don't press me"}/>
            
        </View>
    )
}

export default LeaderBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    text: {
        fontSize:25, 
        color: '#ccc', 
        fontStyle: 'italic'
    }
});