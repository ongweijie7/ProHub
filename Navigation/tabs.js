import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Reminders from '../screens/Reminders';
import Todo from '../screens/Todo';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 50,
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3.5,
                    elevation: 5
                },
               //tabBarInactiveTintColor: ,
                //tabBarActiveTintColor: ,
            }}>

            <Tab.Screen name="Todo" component={Todo} options={{
                // Display incomplete tasks
                tabBarBadge: 3,
                //tabBarBadgeStyle: {backgroundColor: },
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="list-outline" size={24} color={color} /> 
                ),
                tabBarStyle: {display: 'none'}
            }} />

            <Tab.Screen name="Aquarium" component={LeaderBoard} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="fishbowl-outline" size={size} color={color} />
                )
            }} />

            <Tab.Screen name="Reminders" component={Reminders} options={{
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="calendar" size={size} color={color} />
                ),
                tabBarStyle: {display: 'none'}
            }} />
            
      </Tab.Navigator>
    );
}

export default Tabs;
