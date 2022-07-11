import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import global from '../global';
import { trackChanges, addUser } from '../Firebasebackend/LeaderboardBackend';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

const LeaderBoard = () => {
    const [arr, setarr] = useState(global.leaderboard);
    const [email, setemail] = useState("");

    const docref = doc(db, "Users", global.email);

    const add = () => {
        addUser(email);
    }
    //doesnt seem to be loading the relevant detaits -> cannot find snapshot
    useEffect(() => {
        let leaderboard = [];
        getDoc(docref).then((snapshot) => {
            if (snapshot.exists()){
                leaderboard = snapshot.data().leaderboard;
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
            <TextInput 
                placeholder={"Email Address"} 
                value={email} 
                onChangeText={setemail}
                style={{width: 300}}
            /> 
            <Button onPress={add} title={"Add friend"}/>
            
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