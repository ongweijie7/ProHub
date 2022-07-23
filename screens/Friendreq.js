import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { acceptReq, deleteReq } from '../Firebasebackend/Friends';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

//initialising database
const db = getFirestore(firebaseApp);

const Friendreq = () => {
    const [friends, setfriends] = useState(['Howard',
                                            'Stark',
                                            'Tony',]);

    useEffect(() => {
        let requests = ["hello"];
        const docref = doc(db, "Users", global.email);
        getDoc(docref).then((snapshot) => {
            if (snapshot.exists()) {
                requests = snapshot.data().requests;
            } else {
                console.log("no such document");
            }
        }).then(() => {
            setfriends(requests);      
        });
    }, []);                                        

    const add = (index) => {
        const email = friends[index];
        acceptReq(email);
        del(index);
    }

    // delete item from array when done
    const del = (index) => {
        let copy = [...friends];
        copy.splice(index, 1);
        setfriends(copy);
        deleteReq(friends[index]);
    }            

    return (
        <ScrollView style={{padding: 15}}>
        {friends.map((friend, index) => {
          return(
            <View key={index} style={styles.friend}>
                <View style={{flexDirection: 'row'}}>
                   <Image
                    source={require('../assets/ape.jpg')}
                    style={{height: 50, width: 50, borderRadius: 25}}
                    />
                    <View style={{flexDirection: 'column', padding:10}}>
                       <Text style={{fontSize: 16}}>{friend}</Text> 
                       {/* Optional if want to display email address as well update array */}
                        <Text style={{opacity: 0.5}}>@rileyreid</Text> 
                    </View>
                </View>
                
                    {/* Confirm/delete friend button */}
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => add(index)} style={styles.confirm}>
                            <Text style={{alignSelf:'center', color: 'white'}}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => del(index)} style={styles.remove}>
                            <Text style={{alignSelf:'center'}}>Remove</Text>
                        </TouchableOpacity>                        
                    </View>

            </View>                         
          )
      })
      }
    </ScrollView>
    )
}

export default Friendreq;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 15, 
        backgroundColor: 'white'
    },
    addFriend: {
        width:330, 
        borderColor: '#C0C0C0', 
        borderWidth: 2, 
        padding: 10, 
        borderRadius: 10
    },
    line: {
        borderBottomColor:'#b7b7b7', 
        borderBottomWidth: 1, 
        width: 370, 
        left:-15, 
        marginTop:15
    },
    friendContainer: {
        fontWeight: 'bold', 
        fontSize: 16, 
        marginTop: 15, 
        left: 5
    },
    friend: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical:5, 
        justifyContent:'space-between'
    },
    remove: {
        backgroundColor:'#e6e6e6', 
        justifyContent:'center', 
        borderRadius:15,
        height: 30,
        width: 70,
        alignSelf: 'center',
        marginHorizontal: 2
    },
    confirm: {
        backgroundColor:'#0099ff', 
        justifyContent:'center', 
        borderRadius:15,
        height: 30,
        width: 70,
        alignSelf: 'center',
        marginHorizontal: 2
    }
  })