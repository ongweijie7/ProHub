import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Todo from '../screens/Todo';
import Reminders from '../screens/Reminders';
import LeaderBoard from '../screens/Leaderboard';
import FocusTimer from '../screens/FocusTimer';


import CustomDrawer from '../components/CustomDrawer'

import { MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

import Tabs from './tabs';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} />} 
            screenOptions={{
                //drawerActiveBackgroundColor
                drawerLabelStyle: {
                    marginLeft: -25, 
                    fontSize: 15
                },
            }}>
              
            {/* <Drawer.Screen name="LeaderBoard" component={LeaderBoard} options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="leaderboard" size={24} color={color} />
                )
            }}/> */}
            {/* Prototype leaderboard */}
            <Drawer.Screen name="LeaderBoard" component={LeaderBoard} options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="leaderboard" size={24} color={color} />
                )
            }}/>

            <Drawer.Screen name="Todo List" component={Todo} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="list-outline" size={24} color={color} /> 
                ),
            }}/> 

            <Drawer.Screen name="Focus" component={FocusTimer} options={{
                drawerIcon: ({color}) => (
                    <MaterialCommunityIcons name="timer-outline" size={24} color={color} />
                )
            }}/>

            <Drawer.Screen name="Reminders" component={Reminders} options={{
                drawerIcon: ({color}) => (
                    <AntDesign name="calendar" size={24} color={color} />
                ),
            }}/>
        </Drawer.Navigator>
    )
}

export default AppStack;