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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signingIn, setSigningIn] = useState(true);
    const [description, setDescription] = useState("Login");
    

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
        
        let valid = true;
        //logic to validate that the account is ok!
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

            {!signingIn 
            ? <View style={styles.loginWrapper}>
            <TextInput 
              placeholder={"Password"} 
              value={password} 
              onChangeText={setPassword}
            /> 
            </View>
            : <View></View>
            }
            

            <View style={styles.loginWrapper}>
            <TextInput 
              placeholder={signingIn ? "Password" : "Re-enter Password"} 
              value={signingIn ? password : confirmPassword} 
              onChangeText={setConfirmPassword}
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