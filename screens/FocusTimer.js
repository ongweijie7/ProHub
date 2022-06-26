import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import CustomModal  from '../components/CustomModal';
import global from '../global';


export default function FocusTimer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const submit = () => {
    const duration1 = hours.text * 60 * 60 + minutes.number * 60;
    alert("time is changed");
    console.log(duration1);
    setDuration(duration1 );
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const timerFinish = () => {
    global.coins += 10;
    alert("Congratulations on focusing!! Here are your coins")
    return { shouldRepeat: false }
  };

  const changeToHours = (seconds) => {
    return Math.floor(seconds/3600);
  }

  const changeToMinutes = (seconds) => {
    return Math.floor((seconds % 3600) / 60);
  }

  const changeToSeconds = (seconds) => {
    return seconds%60;
  }


  return (    
    <View style={styles.container}>
      <TextInput value={duration} onChangeText={setDuration} keyboardType='numeric'></TextInput>
      
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={timerFinish}
        size={350}
      >
      {({ remainingTime, color }) => (
        <TouchableOpacity style={styles.centerButton} onPress={() => setModalOpen(true)}>
          
          { duration == -1
          ? <View><Text style={{ color, fontSize: 40 }}>Start FOCUSING!!</Text></View>
          : (<View>
            {duration >= 3600
            ? <Text style={{ color, fontSize: 40 }}>
              
              {changeToHours(remainingTime)} hours
            </Text>
            :<Text></Text>}


            {duration >= 60
            ? <Text style={{ color, fontSize: 40 }}>
              
              {changeToMinutes(remainingTime)} minutes
            </Text>
            :<Text></Text>}
            <Text style={{ color, fontSize: 40 }}>
              
              {changeToSeconds(remainingTime)} seconds  
            </Text>
          </View>)}
        </TouchableOpacity>
           
      )}
    </CountdownCircleTimer>
    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
      <View style={styles.buttons}><Button title={'Start'} onPress={() => setIsPlaying(true)}/></View>
      <View style={styles.buttons}><Button title={'Stop'} onPress={() => setIsPlaying(false)}/></View>
    </View>

    <CustomModal open={modalOpen} onPress={closeModal} hours={hours} setHours={(text) => {setHours( {text} )}}
      minutes={minutes} setMinutes={(number) => setMinutes({number})} onSubmit={submit}/>
    
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'aliceblue',
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    padding:20,
    wdith:30
  },
  centerButton: {
    
  }
});