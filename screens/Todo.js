import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, View ,KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Task from '../components/Task';
import DoneTask from '../components/DoneTask';
import CustomSwitch from '../components/CustomSwitch';

import global from '../global';

const Todo = ({navigation}) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])
  const [doneItems, setDoneItems] = useState([])
  const [todoTab, setTodoTab] = useState(1);
  const [coins, setCoins] = useState(0);

  global.coins = coins;

  const onSelectSwitch = (value) => {
      setTodoTab(value);
  }

  const handleAddTask = () => {
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    doneItems.push(taskItems[index])
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setCoins(coins + 10);
  }

  const deleteDone = (index) => {
    let doneCopy = [...doneItems];
    doneCopy.splice(index, 1);
    setDoneItems(doneCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>

          <Text style={styles.sectionTitle}>Today's tasks</Text>

          {/*Open up buy fish pg instead*/}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.coinButton}>
              <Text style={styles.coin}>{coins} Coins </Text>

              <FontAwesome5 name="coins" size={14} color="gold" />
            </View>
          </TouchableOpacity>

        </View>
        
        <View style={styles.switchButton}>
          <CustomSwitch 
              selectionMode={1} 
              option1="Todo" 
              option2="Done"
              onSelectSwitch={onSelectSwitch}
          />
        </View>

        <ScrollView style={styles.items}>
              
          {todoTab == 1 &&
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
            })
          }
          {todoTab == 2 &&
            doneItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => deleteDone(index)}>
                  <DoneTask text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>

      </View>
      
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <View
            style={styles.input}>
            <Ionicons 
              name="pencil" 
              size={24} 
              color="#C6C6C6"
              style={{marginRight: 5}}
            />
            <TextInput 
              placeholder={"Write a task                                     "} 
              value={task} 
              onChangeText={setTask}
            /> 
          </View>
          
          <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
              </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View> 
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#E8EAED",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  coinButton: {
    flexDirection: 'row', 
    marginTop: 0,
    backgroundColor: "#3f4745",
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  coin: {
    fontSize: 15, 
    color: "white", 
    fontWeight: 'bold'
  },
  switchButton: {
    paddingVertical: 20, 
    borderBottomColor: '#ccc', 
    borderBottomWidth: 2,
    alignItems: 'center'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    // Makes the edges curved
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
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
});

export default Todo;