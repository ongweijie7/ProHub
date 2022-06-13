import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Todo from '../screens/Todo';
import Reminders from '../screens/Reminders';
import Aquarium from '../screens/Aquarium';

import CustomDrawer from '../components/CustomDrawer'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
            <Drawer.Screen name="Aquarium" component={Aquarium} options={{
                drawerIcon: ({color}) => (
                    <MaterialCommunityIcons name="fishbowl-outline" size={24} color={color} />
                )
            }}/>
            <Drawer.Screen name="Today's Tasks" component={Todo} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="list-outline" size={24} color={color} /> 
                ),
                headerShown: false, 
            }}/>
            <Drawer.Screen name="Reminders" component={Reminders} options={{
                drawerIcon: ({color}) => (
                    <AntDesign name="calendar" size={24} color={color} />
                ),
                headerShown: false, 
            }}/>
        </Drawer.Navigator>
    )
}

export default AppStack;