import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Reminders = ({navigation}) => {
    return (
        <View style={styles.container}>
            <AntDesign name="calendar" size={70} color={'#ccc'}/>
        </View>
    )
}

export default Reminders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});