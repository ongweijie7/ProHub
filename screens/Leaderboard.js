import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import global from '../global';
import { addUser } from '../Firebasebackend/LeaderboardBackend';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { set } from 'react-native-reanimated';

//initialising database
const db = getFirestore(firebaseApp);



export default function LeaderBoard() {
    const [arr, setarr] = useState();
    const [email, setemail] = useState("");

    useEffect(() => {
        let leaderboard = ["hello"];
        const docref = doc(db, "Users", global.email);
        getDoc(docref).then((snapshot) => {
            if (snapshot.exists()) {
                leaderboard = snapshot.data().leaderboard;
            } else {
                console.log("no such document");
            }
        }).then(() => {
            setarr(leaderboard);
        });
    }, [global.email]);

    return (
        <View style={styles.container}>
            <FlatList
                data={arr}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )} />
            <TextInput
                placeholder={"Email Address"}
                value={email}
                onChangeText={setemail}
                style={{ width: 300 }} />

        </View>
    );
}

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