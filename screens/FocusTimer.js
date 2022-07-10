import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { color } from 'react-native-reanimated';

import CustomModal  from '../components/CustomModal';
import global from '../global';


export default function FocusTimer() {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [coins, setCoins] = useState(false);
  const [duration, setDuration] = useState(-1);
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const submit = () => {
    setKey(prevKey => prevKey + 1);
    let duration1 = 0;
    if (hours.number == undefined || minutes.number == undefined) {
      setModalOpen(false);
      if (hours.number == undefined && minutes.number == undefined) {
        alert("please give valid inputs");
      } else if (minutes.number == undefined) {
        duration1 = hours.number * 60 * 60;
      } else {
        duration1 = minutes.number * 60;
      }

    } else {
      duration1 = hours.number * 60 * 60 + minutes.number * 60;
      alert("Time to do WORK");
      setModalOpen(false);
    }

    if (duration1 > 0) {
      return setDuration(duration1);
    }

    return setDuration(-1);

    
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const timerFinish = () => {
    if (coins) {
      global.coins += 10;
      alert("GOOD JOB!! Here are your coins")
      return { shouldRepeat: false }
    }
    
  };

  const startTimer = () => {
    if (duration > 0) {
      setCoins(true);
      setIsPlaying(true);
    }
    
  }

  const stopTimer = () => {
    setCoins(false);
    setIsPlaying(false);
  }

  const resetTimer = () => {
    setCoins(false);
    setIsPlaying(false);
    setKey(prevKey => prevKey + 1);
    setHours(0);
    setMinutes(0);
    setDuration(-1);
  }


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
        key={key}
      >
      {({ remainingTime, color }) => (
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          
          { duration == -1
          ? <View><Text style={{ color, fontSize: 40 }}>Start FOCUSING!!</Text></View>
          : (<View style={{flexDirection:'row', alignItems:'center'}}>
            {duration >= 3600
            ? <Text style={{ color, fontSize: 40 }}>
              {changeToHours(remainingTime)}:
            </Text>
            :<Text></Text>}
            {duration >= 60
            ? <Text style={{ color, fontSize: 40 }}>
              {changeToMinutes(remainingTime)}:
            </Text>
            :<Text></Text>}
            <Text style={{ color, fontSize: 40 }}>
              {changeToSeconds(remainingTime)} 
            </Text>
          </View>)}
        </TouchableOpacity>
           
      )}
    </CountdownCircleTimer>
    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
      <View style={styles.buttons}><Button title={'Start'} onPress={startTimer}/></View>
      <View style={styles.buttons}><Button title={'Stop'} onPress={stopTimer}/></View>
    </View>

    <View><Button title={"Reset"} onPress={resetTimer}/></View>

    <CustomModal open={modalOpen} onPress={closeModal} hours={hours} setHours={(number) => {setHours( {number} )}}
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
    wdith:30,
    
  },
});