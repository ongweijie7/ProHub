import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import validator from "validator";
import firebaseApp from '../firebase.config';

firebaseApp;

const Login = ({navigation}) => {
    //Firebase authenticator
    const auth  = getAuth();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(true);
    const [description, setDescription] = useState("Login");

    const validateFields = (email, password) => {
        const isValid = {
            email: validator.isEmail(email),
            password: validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
        };
    
        return isValid;
    };

    {/*Confirmation Button to swap to Sign In*/}    
    const signIn = () => {
        signOut(auth).then(() => {
            console.log("Logged out successful");
        }).catch((error) => {
            console.log("No current User");
         });

        signInWithEmailAndPassword(auth, emailAddress, password)
        .then((userCredential) => {
            const user = userCredential.user;
            global.username = emailAddress;
            navigation.replace('Main')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert("Wrong Email/Password.Please check again");
        });
    };

    {/*Button to swap to Register*/}
    const register = () => {
        setSigningIn(false);
        setDescription("Sign Up Now!!");
    }

    {/*Confirmation Button to register*/}
    const signUp = () => {
        console.log(emailAddress)

        //logic to validate that the account is ok!
        const isValid = validateFields(
            emailField.text, 
            passwordField.text
        );

        createUserWithEmailAndPassword(auth, emailAddress, password).then(
            () => {
                alert("Welcome!!");
                global.username = emailAddress;
                navigation.replace('Main');
        })
        .catch((error) => {
            alert("hi that was an incorrect email");
        });
    }
    
    
    return (
        <KeyboardAvoidingView style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>


            <View style={styles.loginWrapper}>
            <TextInput 
              placeholder={"Email Address"} 
              value={emailAddress} 
              onChangeText={setEmailAddress}
            /> 
            </View>

            <View style={styles.loginWrapper}>
            <TextInput 
              placeholder={"Password"} 
              value={password} 
              onChangeText={setPassword}
            /> 
            <TouchableOpacity onPress={signingIn ? signIn : signUp} style={{flexDirection: 'row'}}>
                <AntDesign name={"login"} size={24} color="black" />
                <Text>{description}</Text>
            </TouchableOpacity>
            </View>

            <View>
            { signingIn 
            ? <Button style={styles.button} title={"Don't have an account yet?"} onPress={register}/>
            : <Text></Text>}
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