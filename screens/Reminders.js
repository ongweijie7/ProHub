import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, TextInput, Modal, Alert, StatusBar} from 'react-native';
import {Agenda} from 'react-native-calendars';

import { AntDesign } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import Notification, {schedulePushNotification, getNext} from '../components/Notification';
import * as Notifications from 'expo-notifications';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Reminders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // Reminder Object
  const [items, setItems] = useState({});
  // Datetimepicker
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [displayDate, setdisplayDate] = useState((date.getMonth() + 1) + '/' + date.getDate());
  const [displayTime, setDisplayTime] = useState(time.getHours() + ':' + time.getMinutes());
  // Reminder details
  const [title, setTitle] = useState();
  const [notes, setNotes] = useState();

  // Adds 0 to single digit time
  const nicerTime = (ugly) => {
    let currentHours = ugly.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    let currentMin = ugly.getMinutes();
    currentMin= ("0" + currentMin).slice(-2);
    let period = "AM";
    if (currentHours > 12) {
      period = "PM";
    }
    return currentHours + ":" + currentMin + period
  }

  // Delete item in list 
  // Fix in july: (Buggy because of the way calender refreshes -> item 2 deleted, new item 2 continues to show the old version)
  const deletion = (item) => {
    Notifications.cancelScheduledNotificationAsync(item.id);
    const newerItems = {};
      Object.keys(items).forEach((key) => {
        newerItems[key] = items[key];
        // Finding correct day and check if it has array as value
        if (key == item.date && items[key] !== 'undefined') {
          newerItems[key].forEach((reminder) => {
            // FInding correct item
            if (reminder.id === item.id) {
              let toDel = newerItems[key].indexOf(reminder);
              newerItems[key].splice(toDel, 1);
            }  
          });
        }
      });
      setItems(newerItems);
  }

  // Close modal 
  const cancel = () => {
    setTitle('');
    setNotes('');
    setModalOpen(false);
    let today = new Date();
    setdisplayDate((today.getMonth() + 1) + '/' + today.getDate());
    setDisplayTime((today.getHours()) + ':' + today.getMinutes());
    setDate(new Date());
    setTime(new Date());
  }

  // DatePicker
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    // Month starts with index 0 so need +1
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
    setdisplayDate(fDate)
    setShowDate(false);
  }

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    setDisplayTime(nicerTime(tempTime));
    setShowTime(false);
  }

  // Add item from Modal (slow due to awaiting notifications)
  async function handleAddTask() {
    if (title === "" || notes === "") {
      Alert.alert("Error", "Please fill up all fields", [
        {text: "Ok"}
      ]);
    } else {
      let tempDate = new Date(date);
      let day = tempDate.getDate() < 10 ? '0' + tempDate.getDate()  : tempDate.getDate();
      let fDate = tempDate.getFullYear() + '-0' + (tempDate.getMonth() + 1) + '-' + day;
      
      // Schedules local notification
      const id = await schedulePushNotification(date, time, title, notes);
      let item = {name: title, details: notes, date: fDate, time: nicerTime(time), id: id};

      const newerItems = {};
        // Add new item in
        if (items[fDate] !== 'undefined') {
          newerItems[fDate] = items[fDate];          
        } else {
          newerItems[fDate] = [];
        }
        newerItems[fDate].push(item);

        // Copies over rest of items
        Object.keys(items).forEach((key) => {
          if (key !== fDate) {
              newerItems[key] = items[key];
            }
        });

      // Reset Modal to blank form
      setItems(newerItems);
      setModalOpen(false);
      setTitle('');
      setNotes('');
      let today = new Date();
      setdisplayDate((today.getMonth() + 1) + '/' + today.getDate());
      setDisplayTime(nicerTime(today));
      setDate(new Date());
      setTime(new Date());
    }
    
  }

  const loadItems = (day) => {
    setTimeout(() => {
      // Display 14 days
      for (let i = -15; i < 15; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          // Initialise each object with empty array
          items[strTime] = [];
        }
      }
      // Makes copy of items to update it using setItems
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {

    return (
    <View 
      style={{
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }}>
      <TouchableOpacity onPress={() => deletion(item)}>
      <View>
        <Text style={{fontSize: 18, paddingLeft: 5}}>{item.time}</Text>
        <Text style={{fontSize: 18, padding: 5}}>{item.name}</Text>
        <Text style={{fontSize: 14, paddingLeft: 5, color: '#99aab5'}}>{item.details}</Text>
      </View>
      </TouchableOpacity>
    </View>
    
    )
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <View style={{borderBottomColor: '#e2dccd', borderWidth: 0.5, top: 18}}/>
        </View>
    );
  }

  return (
    // Temp fix to status bar
    <View style={{flex: 1, borderTopColor: "#dcdcdc", borderTopWidth: 1}}>
      <Agenda
        minDate={'2022-01-01'}
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >          
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
                </TouchableOpacity>     
                {/* Debugger
                <TouchableOpacity onPress={async () => {await getNext()}} style={{margin: 30}}>
                        <AntDesign name="clockcircleo" size={24} color="#b7b7b7" />
                </TouchableOpacity> */}
            </View>          
      </KeyboardAvoidingView>

      <Modal visible={modalOpen} animationType='slide' presentationStyle='overFullScreen'>
          <View style={styles.modalContainer}>
                      {/* Header Bar */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={cancel} style={styles.modalClose}>
                        <Text style={{fontSize: 17, color: '#00a2ec'}}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>New Reminder</Text>
                    <TouchableOpacity onPress={handleAddTask} style={styles.modalAdd}>
                        <Text style={{fontSize: 17, color: '#b7b7b7'}}>Add</Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <View style={styles.card}>
                        <TextInput
                            placeholder={"Title"} 
                            value={title} 
                            onChangeText={setTitle}
                            style={{borderBottomColor: '#b7b7b7', borderBottomWidth: 1, padding: 5, fontSize: 20, fontWeight: '700'}}
                        />
                        <TextInput
                            placeholder={"Notes"} 
                            value={notes} 
                            onChangeText={setNotes}
                            style={{padding: 5, paddingBottom: 30, fontSize: 18}}
                        />
                    </View>
                    <View style={{...styles.card, ...styles.date}}>
                        <Text style={{fontSize: 18}}>Date: </Text>
                        <Text style={{fontSize: 18, left: -100}}>{displayDate}</Text>
                        
                        <TouchableOpacity onPress={() => setShowDate(true)}>
                            <AntDesign name="calendar" size={24} color="#b7b7b7" />
                        </TouchableOpacity>
                    </View>

                    <View style={{...styles.card, ...styles.date}}>
                        <Text style={{fontSize: 18}}>Time: </Text>
                        <Text style={{fontSize: 18, left: -85}}>{displayTime}</Text>
                        <TouchableOpacity onPress={() => setShowTime(true)}>
                            <AntDesign name="clockcircleo" size={24} color="#b7b7b7" />
                        </TouchableOpacity>
                        
                        {showDate && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display='default'
                            onChange={onChangeDate}
                        />)}
                        {showTime && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value={time}
                            mode='time'
                            is24Hour={true}
                            display='default'
                            onChange={onChangeTime}
                        />)}

                    </View>
                    <Notification />
                </View>
          </View>
      </Modal>
    </View>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    left: 290
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#0F52BA',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    elevation: 2,
  },
  addText: {
    color: 'white',
  },  
  emptyDate: {
    flex: 1,
    height: 15,
    flex:1,
    paddingTop: 30

  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  modalHeader: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalClose: {
    left: -30
  },
  modalTitle: {
    fontSize: 17, 
    left: -8
  },
  modalAdd: {
    right: -30,
  },
  card: {
    backgroundColor: 'white', 
    borderRadius: 10, 
    margin: 10, 
    padding: 10, 
    elevation: 2
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
