import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, TextInput, Modal} from 'react-native';
import {Agenda} from 'react-native-calendars';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Reminders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState({});
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [displayDate, setdisplayDate] = useState((date.getMonth() + 1) + '/' + date.getDate());
  const [title, setTitle] = useState();
  const [notes, setNotes] = useState();

  const deletion = (time) => {
    const newerItems = {};
      Object.keys(items).forEach((key) => {
        if (key == time) {
          // Deleting any item in a day deletes that day's list
          newerItems[key] = [];
        } else {
          newerItems[key] = items[key];
        }
      });
      setItems(newerItems);
  }
  // Close modal 
  const cancel = () => {
    setTitle('');
    setNotes('');
    setModalOpen(false);
  }

  // DatePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    // Month starts with index 0 so need +1
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
    setdisplayDate(fDate)
    setShow(false);
  }

  // Add item from Modal
  const handleAddTask = () => {
    let tempDate = new Date(date);
    let fDate = tempDate.getFullYear() + '-0' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    let item = {name: title, details: notes, time: fDate};
    
    const newerItems = {};
      Object.keys(items).forEach((key) => {
        if (key == fDate) {
          newerItems[key] = items[key];
          newerItems[key].push(item);
        } else {
          newerItems[key] = items[key];
        }
      });
    setItems(newerItems);
    setModalOpen(false);
    setTitle('');
    setNotes('');
    let today = new Date();
    setdisplayDate((today.getMonth() + 1) + '/' + today.getDate());
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
      <TouchableOpacity onPress={() => deletion(item.time)}>
      <View>
        <Text style={{fontSize: 18, paddingLeft: 5}}>10:00AM - 10:45AM</Text>
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
    <View style={{flex: 1, marginTop: 30}}>
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
            </View>          
      </KeyboardAvoidingView>

      <Modal visible={modalOpen} animationType='slide' presentationStyle='overFullScreen'>
          <View style={styles.modalContainer}>
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
                        
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <AntDesign name="calendar" size={24} color="#b7b7b7" />
                        </TouchableOpacity>
                        
                        {show && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />)}

                    </View>
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
