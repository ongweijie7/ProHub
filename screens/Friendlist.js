import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { deleteFriend, sendReq } from '../Firebasebackend/Friends';
import { refresh } from './Leaderboard';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getTimestamp } from 'react-native-reanimated/lib/reanimated2/core';

//initialising database
const db = getFirestore(firebaseApp);

let refresh2; 

// add/manage/view friends
const Friendlist = (props) => {
    const [email, setemail] = useState("");
    const [count, setCount] = useState(0);
    const [ranppl, setranppl] = useState([{name: 'Howard', level: 1000, activities: []},])

    const addFriends = () => {
        if (email === ""){
            alert("Please enter an email");
        } else {
            sendReq(email);
        }
        setemail("");
    }

    refresh2 = () => {
        setCount(count + 1);
    }

    //global.friends is an array of friend objects

    const removeFriend = (email) => {
        deleteFriend(email);
        setTimeout(() => {
            refresh();
            setCount(count + 1);       
        }, 100);
    }

    const docref = doc(db, "Users", global.email);

    useEffect(() => {
        let leaderboard = [{name: 'Howard', level: 1000, activities: []}];
        getDoc(docref).then((snapshot) => {
            if (snapshot.exists()) {
                leaderboard = snapshot.data().friends;
            } else {
                console.log("no such document");
            }
        }).then(() => {
            //console.log(leaderboard);
            setranppl(leaderboard);
        });
      }, [count]);

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 20}}>
                {/* ADD Friends button */}
                <TouchableOpacity onPress={addFriends}>
                    <Text style={{color: '#00a2ec', fontWeight: 'bold'}}>ADD FRIENDS</Text>
                </TouchableOpacity>
                <TextInput 
                placeholder={"Email Address"} 
                    value={email} 
                    onChangeText={setemail}
                    style={styles.addFriend}
                /> 
            </View>

            {/* Stack navigator to friend request screen */}
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=> props.navigation.navigate('Friend Requests')}>
               <Image
                source={require('../assets/lr.jpg')}
                style={{height:50, width:50, borderRadius: 25, marginRight: 10}}
              />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 16}}>Friend Requests</Text>
                    <Text style={{opacity: 0.5}}>Approve or ignore requests</Text> 

                </View>

            </TouchableOpacity>


            <View style={styles.line}/>

            <Text style={styles.friendContainer}>ALL FRIENDS</Text>
            <ScrollView>
                {ranppl.map((friend, index) => {
                  return(
                    <View key={index} style={styles.friend}>
                        <View style={{flexDirection: 'row'}}>
                           <Image
                            source={require('../assets/ape.jpg')}
                            style={{height: 50, width: 50, borderRadius: 25}}
                            />
                            <View style={{flexDirection: 'column', padding:10}}>
                               <Text style={{fontSize: 16}}>{friend.name}</Text> 
                               {/* Optional if want to display email address as well update array */}
                                <Text style={{opacity: 0.5}}>{friend.email}</Text> 
                            </View>
                        </View>
                        
                            {/* Remove friend button */}
                          <TouchableOpacity onPress={() => removeFriend(friend.email)} style={styles.remove}>
                            <Text style={{alignSelf:'center'}}>Remove</Text>
                          </TouchableOpacity>
                    </View>                         
                  )
              })
              }

            </ScrollView>


        </View>
    );
}
export { refresh2 };
export default Friendlist;

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
        borderRadius:7,
        height: 30,
        width: 85,
        alignSelf: 'center'
    }
  })

