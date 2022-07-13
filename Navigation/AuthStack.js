import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import Login from '../screens/Login';
import AppStack from './AppStack';
import Friendlist from '../screens/Friendlist';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={OnBoardingScreen} name="onBoarding" options={{headerShown: false}}/>
            <Stack.Screen component={Login} name="Placeholder loginScreen" options={{headerShown: false}}/>
            <Stack.Screen component={AppStack} name="Main" options={{headerShown: false}}/>
            <Stack.Screen component={Friendlist} name="Activity" options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

export default AuthStack;