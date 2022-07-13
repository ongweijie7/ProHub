import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Button, ImageBackground, Image, StatusBar} from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import validator from 'validator';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebaseApp from '../firebase.config';
import CreateAcc from '../Firebasebackend/CreateAcc';
import LoginBackend from '../Firebasebackend/LoginBackend';
import LeaderBoard from './Leaderboard';

firebaseApp;

const Login = ({navigation}) => {
    const auth  = getAuth();
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signingIn, setSigningIn] = useState(true);
    const [description, setDescription] = useState("LOGIN");
    
    {/*Validates whether email and password is valid*/}
    const validateFields = (email, password) => {
        const isValid = {
            email: validator.isEmail(email),
            password: validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            }),
        };
    
        return isValid;
    };

     {/*Button to swap to Register*/}
     const register = () => {
        setSigningIn(false);
        setDescription("Sign Up Now!!");
    }

    {/*Confirmation Button to swap to Sign In*/}    
    const signIn = () => {
        signOut(auth).then(() => {
            console.log("Logged out successful");
        }).catch((error) => {
            console.log("No current User");
         });

        signInWithEmailAndPassword(auth, emailAddress, password)
        .then(() => {
            LoginBackend(emailAddress).then(() => {
                navigation.replace('Main');
            })
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert("Wrong Email/Password.Please check again");
        });
    };

    {/*Confirmation Button to register*/}
    const signUp = () => {
        let valid = true;
        const isValid = validateFields(
            emailAddress, 
            password
        );

        if (!isValid.password && !isValid.email) {
            alert("Please enter a valid email and your password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters");
        } else if (!isValid.password) {
            alert("Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters");
        } else if (!isValid.email) {
            alert("Please enter a valid email");
        } else if (password != confirmPassword) {
            valid = false;
            alert("Sorry but your passwords do not match")
        }
        
        if (isValid.password && isValid.email && valid) {
            createUserWithEmailAndPassword(auth, emailAddress, password)
            .then(() => {
                alert("Welcome!!");
                navigation.replace('Main'); 
                CreateAcc(emailAddress, username);
                console.log("creating account");
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
        
    }
    
    
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require('../assets/flowing-blue-abstract-texture.jpg')}
                style={{padding: 75}}
            >
                <View style={{paddingTop: 0, alignSelf: "center"}}>
                    <MaterialCommunityIcons name="book-clock-outline" size={40} color="white" />
                </View>
                <Text style={{alignSelf: 'center', color: "white", fontSize: 24}}>PROHUB</Text>
            </ImageBackground>


            <View style={{alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 20, padding: 20, fontWeight: '800'}}>LOGIN</Text>

                {!signingIn
                ? <View style={styles.loginWrapper}> 
                    <TextInput 
                    placeholder={"Username"} 
                    value={username} 
                    onChangeText={setUsername}
                    style={{width: 300}}
                    /> 
                </View>
                : <View></View>
                }
                
                <View style={styles.loginWrapper}> 
                    <TextInput 
                    placeholder={"Email Address"} 
                    value={emailAddress} 
                    onChangeText={setEmailAddress}
                    style={{width: 300}}
                    /> 
                </View>

                {!signingIn 
                ? <View style={styles.loginWrapper}>
                    <TextInput 
                    placeholder={"Password"} 
                    value={password} 
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={{width: 300}}
                    /> 
                </View>
                : <View></View>
                }
                
                <View style={styles.loginWrapper}>
                    <TextInput 
                        placeholder={signingIn ? "Password" : "Re-enter Password"} 
                        value={signingIn ? password : confirmPassword} 
                        onChangeText={signingIn ? setPassword: setConfirmPassword}
                        secureTextEntry={true}
                        style={{width: 300}}
                    /> 
                </View>

                <TouchableOpacity onPress={signingIn ? signIn : signUp} style={styles.addWrapper}>
                        <Text style={{color: "white", fontSize: 20, padding: 3}}>{description}</Text>
                </TouchableOpacity>

                <View>
                    { signingIn 
                    ? <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}} onPress={register}>
                        <Text style={{color: "#b7b7b7"}}>Don't have an account?  </Text>
                        <Text style={{textDecorationLine: 'underline', color: "#b7b7b7", fontWeight: "bold"}}>Register</Text>
                    </TouchableOpacity>
                    : <Text></Text>}
                </View>

                <View>
                    {!signingIn 
                    ? <TouchableOpacity style={{flexDirection: 'row', marginTop: -10}} onPress={() => setSigningIn(true)}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    : <Text></Text>}
                </View>                                   
            </View>
            {/* provide padding at bottom */}
            <View style={{flex: 1}}/>  
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
        justifyContent: 'flex-end'
    },
    loginWrapper: {
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10
    },
    addWrapper: {
        backgroundColor: '#0F52BA',
        padding: 10,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center'
    },

});