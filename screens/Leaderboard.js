import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, Modal} from 'react-native';
import Friends from '../components/Friendship';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import global from '../global';
import Dialog, {  DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';

import { firebaseApp } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


//initialising database
const db = getFirestore(firebaseApp);

let refresh;

const ProtoBoard = ({ navigation }) => {

  const [count, setCount] = useState(0);

  refresh = () => {
    setCount(count + 1);
  }

//get 
let [ranppl, setranppl] = useState([]);
                                    
const [modalOpen, setModalOpen] = useState(false);    
// which friend activity to display
const [display, setDisplay] = useState(0);                                
                  
  const openModal = (index) => {
    setModalOpen(true);
    setDisplay(index);
  }

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
  }, [global.level, count]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Activity', {array: global.friends})} style={{marginRight: 10}}>
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
                source={require('../assets/user-profile.jpg')}
                style={styles.image}
              />
              <View style={styles.oneWrapper}>
                <Text style={styles.oneText}>{global.level}</Text>
              </View>
              
              {/* User Info */}
              <Text style={{alignSelf: 'center', color: "white", fontSize: 24, fontWeight: '600'}}>{global.username}</Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{color: "white", opacity: 0.5, fontSize: 14, paddingHorizontal: 5}}>{global.XP}</Text>
                <MaterialCommunityIcons name="star-four-points" size={14} color="white" style={{marginTop: 4, opacity: 0.5}}/>
              </View>
              
          </View>
          {/* leaderboard people */}
          { ranppl.length > 0 ?
          <ScrollView style={{marginTop: -50}}>
              {ranppl.map((friend, index) => {
                  return(
                      <TouchableOpacity key={index} onPress={() => openModal(index)}>
                          <Friends friend={friend} index={index}/>
                      </TouchableOpacity>
                  )
              })
              }
          </ScrollView>
          : <Text style={{backgroundColor: '#FFF',
          padding: 20,
          borderRadius: 10,
          alignSelf: 'center',
          marginHorizontal: 20,
          marginBottom: 16,
          elevation: 5,
          marginTop: -20,
          width: 330}}>Add friends to see them on your Leaderboard!</Text>}

          { ranppl.length > 0 ?
          <Dialog
            visible={modalOpen}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Close"
                  onPress={() => setModalOpen(false)}
                />
              </DialogFooter>
            }
            dialogTitle={<DialogTitle title="Recent Activity" />}
          >
            <DialogContent style={{width: 300}}>
                <View style={{marginTop: 20}}>
                  {/* pass in recent activity arr here */}
                  {/*activities.map((item, index) or {activities2[display].activity.map((item, index)...*/}
                  {ranppl[display].activities.slice(0, 5).map((item, index) => {
                      return(
                        <Text key={index} style={{padding: 10, alignSelf: 'center'}}>{index + 1  + ". " + item}</Text>
                      )
                  })
                  }
                </View>
            </DialogContent>
          </Dialog>
          : <View/> }
      </View>
  )
}

export { refresh };

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