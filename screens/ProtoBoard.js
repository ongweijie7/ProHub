import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet} from 'react-native';
import Friends from '../components/Friendship';
import { FontAwesome5 } from '@expo/vector-icons';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


//initialising database
const db = getFirestore(firebaseApp);

const ProtoBoard = ({ navigation }) => {

let [ranppl, setranppl] = useState([{name: 'Howard', coins: 1000},
                                    {name: 'Stark', coins: 999},
                                    {name: 'Tony', coins: 832},
                                    {name: 'Zoro', coins: 754},
                                    {name: 'Juro', coins: 611},
                                    {name: 'Rogers', coins: 459},
                                    {name: 'Riley', coins: 300},
                                    {name: 'Luffy', coins: 250},
                                    {name: 'Reid', coins: 198},
                                    {name: 'Face', coins: 60},
                                    ])

  console.log(global.email);
  //this line has issues

  const docref = doc(db, "Users", global.email);

    useEffect(() => {
      let leaderboard = [];
      getDoc(docref).then((snapshot) => {
          if (snapshot.exists()) {
              leaderboard = snapshot.data().friends;
          } else {
              console.log("no such document");
          }
      }).then(() => {
          setranppl(leaderboard);
      });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Activity', {array: ranppl})} style={{marginRight: 10}}>
          <FontAwesome5 name="user-friends" size={24} color="black" style={{opacity: 0.7}}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);   

  return (
      <View style={{flex: 1}}>
        <View
            style={{height: 250, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, 
              backgroundColor: '#C3675A'}}
        >
            <Image
                source={require('../assets/rr.jpg')}
                style={styles.image}
              />
              <View style={styles.oneWrapper}>
                <Text style={styles.oneText}>1</Text>
              </View>
              
              {/* Leader Info */}
              <Text style={{alignSelf: 'center', color: "white", fontSize: 24, fontWeight: '600'}}>{ranppl[0].name}</Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{color: "white", opacity: 0.5, fontSize: 14, paddingHorizontal: 5}}>{ranppl[0].coins}</Text>
                <FontAwesome5 name="coins" size={14} color="white" style={{marginTop: 4, opacity: 0.5}}/>
              </View>
              
        </View>

          <ScrollView style={{marginTop: -50}}>
              {ranppl.slice(1).map((friend, index) => {
                  return(
                      <TouchableOpacity key={index} onPress={() => {}}>
                          <Friends friend={friend} index={index}/>
                      </TouchableOpacity>
                  )
              })
              }
          </ScrollView>
      </View>
  )
}

export default ProtoBoard;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 100, 
    width: 100, 
    borderRadius: 50, 
    marginTop: 30,
    borderColor: '#C78F01', 
    borderWidth: 4
  },
  oneWrapper: {
    height: 33,
    width: 33, 
    borderRadius: 17,
    backgroundColor: '#C78F01',
    alignSelf: 'center', 
    justifyContent: 'center', 
    marginTop: -20
  },
  oneText: {
    alignSelf: 'center', 
    fontSize:20, 
    color: 'white', 
    fontWeight: 'bold'
  }
})