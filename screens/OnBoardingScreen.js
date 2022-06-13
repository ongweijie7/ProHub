import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

import FishTank from '../assets/fishtank-colour.svg'

const OnBoardingScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Feeding Fishes</Text>
      </View>
      <View style={styles.img}>
        <FishTank width={300} height={300} />
      </View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Placeholder loginScreen')}
        style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>Your aquarium awaits!</Text>
        <MaterialCommunityIcons name="jellyfish-outline" size={24} color="white" />
      </TouchableOpacity>
      
    </View>
  )
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 75,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    color: '#20315f',
  },
  img: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonWrapper: {
    backgroundColor: '#0F52BA',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 75,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic'
  }
})