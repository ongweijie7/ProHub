import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import Login from '../screens/Login';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={OnBoardingScreen} name="onBoarding" options={{headerShown: false}}/>
            <Stack.Screen component={Login} name="Placeholder loginScreen"/>
            <Stack.Screen component={AppStack} name="Main" options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AuthStack;