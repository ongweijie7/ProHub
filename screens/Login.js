import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Login = ({navigation}) => {
    const [name, setName] = useState("");

    const handleLogin = () => {
        if (name == "") {
            global.username = "Stranger Danger";
        } else {
            global.username = name;
        }
        
        navigation.replace('Main')
    }

    return (
        <KeyboardAvoidingView style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.loginWrapper}>
            <TextInput 
              placeholder={"UserName                                    "} 
              value={name} 
              onChangeText={setName}
            /> 
            <TouchableOpacity onPress={handleLogin} style={{flexDirection: 'row'}}>
                <AntDesign name="login" size={24} color="black" />
                <Text>  Login</Text>
            </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        padding: 20
    },
    loginWrapper: {
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    }
});