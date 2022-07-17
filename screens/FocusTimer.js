import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { color } from 'react-native-reanimated';

import { FontAwesome } from '@expo/vector-icons';

import CustomModal  from '../components/CustomModal';
import global from '../global';


export default function FocusTimer() {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [coins, setCoins] = useState(false);
  const [duration, setDuration] = useState('-1');
  
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const submit = () => {
    setKey(prevKey => prevKey + 1);
    let duration1 = 0;
    console.log(hours);
    console.log(minutes);
    if (hours == undefined || minutes == undefined) {
      setModalOpen(false);
      if (hours == undefined && minutes == undefined) {
        alert("please give valid inputs");
      } else if (minutes == undefined) {
        duration1 = hours * 60 * 60;
      } else {
        duration1 = minutes * 60;
      }

    } else {
      duration1 = hours * 60 * 60 + minutes * 60;
      alert("Time to do WORK");
      setModalOpen(false);
    }

    if (duration1 > 0) {
      return setDuration(duration1.toString());
    }

    return setDuration('-1');

    
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
      setStarted(true);
    }
    if (started) {
      setPaused(false);
    }
  }

  const stopTimer = () => {
    setCoins(false);
    setIsPlaying(false);
    setPaused(!paused);
  }

  const resetTimer = () => {
    setCoins(false);
    setIsPlaying(false);
    setKey(prevKey => prevKey + 1);
    setHours(0);
    setMinutes(0);
    setDuration('-1');
    setStarted(false);
    setPaused(false);
  }


  const changeToHours = (seconds) => {
    let display = Math.floor(seconds/3600);
    if (display === 0) {
      display = "00";
    } else if (display <10) {
      display = "0" + display;
    }
    return display;
  }

  const changeToMinutes = (seconds) => {
    let display = Math.floor((seconds % 3600) / 60);
    if (display === 0) {
      display = "00";
    } else if (display <10) {
      display = "0" + display;
    }
    return display;
  }

  const changeToSeconds = (seconds) => {
    let display = seconds%60;
    if (display === 0) {
      display = "00";
    } else if (display <10) {
      display = "0" + display;
    }
    return display;
  }


  return (    
    <View style={styles.container}>
      <View>
          <TextInput value={duration} onChangeText={setDuration} keyboardType='numeric' style={{color: 'white'}}/>
      
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={timerFinish}
            size={280}
            key={key}
          >
          {({ remainingTime, color }) => (
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              
              { duration == -1
              ? <View><Text style={{ color, fontSize: 32}}>00 : 00 : 00</Text></View>
              : (<View style={{flexDirection:'row', alignItems:'center'}}>
                {duration >= 3600
                ? <Text style={{ color, fontSize: 32 }}>
                  {changeToHours(remainingTime)} :
                </Text>
                :<Text></Text>}
                {duration >= 60
                ? <Text style={{ color, fontSize: 32 }}>
                  {" " + changeToMinutes(remainingTime) + " :"}
                </Text>
                :<Text></Text>}
                <Text style={{ color, fontSize: 32 }}>
                  {" " + changeToSeconds(remainingTime)} 
                </Text>
              </View>)}
            </TouchableOpacity>
              
          )}
          </CountdownCircleTimer>
      </View>

    {
      started ? //timer has been started is true
              <View style={styles.pauseWrapper}>
                {paused ?
                  <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={startTimer} style={styles.pause}>
                      <FontAwesome name="play" size={18} color="#999999" />
                    </TouchableOpacity>
                    <Text style={{alignSelf: 'center'}}>Resume</Text>
                  </View>
                  :
                  <View style={{flexDirection:'column'}}>
                    <TouchableOpacity onPress={stopTimer} style={styles.pause}>
                      <FontAwesome name="pause" size={18} color="#999999" />
                    </TouchableOpacity>
                    <Text style={{alignSelf: 'center'}}>Pause</Text>
                  </View>
                } 

                <View style={{flexDirection:'column'}}>
                  <TouchableOpacity onPress={resetTimer} style={styles.pause}>
                  <FontAwesome name="stop" size={18} color="#999999" />
                  </TouchableOpacity>
                  <Text  style={{alignSelf: 'center'}}>Reset</Text>
                </View>
              </View>
              : //timer has been started is false
              <View style={{flexDirection: 'column', top: 25}}>
                <TouchableOpacity onPress={startTimer} style={styles.start}>
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetTimer}>
                  <Text style={{alignSelf: 'center', padding: 20, fontSize: 18}}>Reset</Text>
                </TouchableOpacity>
              </View>

    }

    <CustomModal open={modalOpen} onPress={closeModal} hours={hours} setHours={(number) => {setHours( number )}}
      minutes={minutes} setMinutes={(number) => setMinutes( number )} onSubmit={submit}/>
    {/* parseInt(text,10) */}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    padding:20,
    wdith:30,
    
  },
  start: {
    backgroundColor: '#E9E9FF',
    width: 295,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    alignSelf: 'center', 
    fontWeight: '600', 
    fontSize: 18
  },
  pause: {
    backgroundColor: '#E9E9FF',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pauseWrapper: {
    flexDirection: 'row',
    width: 360,
    justifyContent: 'space-around',
    marginTop:55
  }
});