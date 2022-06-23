import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { FontAwesome5 } from '@expo/vector-icons';
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
            <DrawerContentScrollView 
                {...props} 
                contentContainerStyle={{backgroundColor: '#8200d6'}}>
                    {/*Top Half of drawer */}
                    <ImageBackground
                     source={require('../assets/menu-bg.jpeg')}
                     style={{padding: 20}}>
                     <Image
                       source={require('../assets/user-profile.jpg')}
                       style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                     />
                    <Text style={{fontSize: 18, color: 'white'}}>{global.username}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>{global.coins} Coins </Text>
                        <FontAwesome5 name="coins" size={14} color="white" />
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