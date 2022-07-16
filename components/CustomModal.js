
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, TextInput, Modal, Alert, StatusBar} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomModal(props) {
    return (
        <View style={styles.container}>
            <Modal visible={props.open} animationType={'slide'} transparent={true}>
                <View style={styles.TextContainer}>
                    <MaterialIcons
                    name='close'
                    size={24}
                    onPress={props.onPress}/>
                    <Text> Hours</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={String(props.hours)} onChangeText={(text) => props.setHours(text)}></TextInput>
                    <Text> Minutes </Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={String(props.minutes)} onChangeText={(text) => props.setMinutes(text)}></TextInput>

                    <View style={styles.button}>
                    <TouchableOpacity onPress={props.onSubmit} styles={{borderColor:'black'}}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding:10
      
    },
    TextContainer: {
    backgroundColor: 'aliceblue',
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
      borderStyle: 'solid',
      borderColor: "#ccc",
      borderWidth: 2,
      borderRadius: 10,
    },
    button: {
        alignSelf:'center', 
        backgroundColor:'deepskyblue', 
        padding:10,
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 10,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 10,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    }
  });
  