import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Aquarium = () => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="fishbowl-outline" size={75} color={'#ccc'} />
            <Text style={styles.text}>Imagine moving Fishes</Text>
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