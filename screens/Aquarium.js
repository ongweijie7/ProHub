import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Aquarium = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="leaderboard" size={75} color="#ccc" />
            <Text style={styles.text}>Imagine a leaderBoard</Text>
        </View>
    )
}

export default Aquarium;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    text: {
        fontSize:25, 
        color: '#ccc', 
        fontStyle: 'italic'
    }
});