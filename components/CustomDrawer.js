import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import global from '../global';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from '../firebase.config';

firebaseApp;
const CustomDrawer = (props) => {

    const auth = getAuth();
    
    {/*signOut function*/}
    const logOut = () => {
        signOut(auth).then(() => {
            console.log("Logged out");
            props.navigation.replace('onBoarding');
        }).catch((error) => {
            // An error happened.
            console.log("error in logging out");
         });
    }
    

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >               
                {/*Top Half of drawer */}
                <ImageBackground
                    source={require('../assets/flowing-blue-abstract-texture.jpg')}
                    style={{padding: 20, marginTop: -4}}>
                    <Image
                    source={require('../assets/user-profile.jpg')}
                    style={styles.image}
                    />
                    <View style={styles.oneWrapper}>
                        <Text style={styles.oneText}>{global.level}</Text>
                    </View>

                <Text style={{fontSize: 18, color: 'white'}}>{global.username}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white'}}>{global.coins} Coins </Text>
                    <MaterialCommunityIcons name="star-four-points" size={14} color="white" />
                </View>
                </ImageBackground>

                {/*Drawer screens*/}
                <View style={{flex:1, backgroundColor:'white',paddingTop:10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            {/*Sign Out button*/}
            <View style={{borderTopWidth:1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={logOut} style={{paddingVertical:15}}>
                    <View style={{flexDirection: 'row', marginLeft: 20}}>
                        <Ionicons name="exit-outline" size={24} color="black" />
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </View>
        

    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    image: {
      height: 80, 
      width: 80, 
      borderRadius: 40, 
      marginBottom: 10,
      borderColor: '#C78F01', 
      borderWidth: 3
    },
    oneWrapper: {
      height: 20,
      width: 20, 
      borderRadius: 10,
      backgroundColor: '#C78F01',
      marginTop: -20,
      left: 32
    },
    oneText: {
      alignSelf: 'center', 
      fontSize:13, 
      color: 'white', 
      fontWeight: 'bold'
    }
  })