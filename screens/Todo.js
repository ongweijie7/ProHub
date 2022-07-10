import React, {useEffect, useState} from "react";
import { ScrollView, StyleSheet, Text, View ,KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Task from '../components/Task';
import DoneTask from '../components/DoneTask';
import CustomSwitch from '../components/CustomSwitch';

import global from '../global';

import { firebaseApp } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, setDoc, query, where } from 'firebase/firestore';

//initialising database
const db = getFirestore(firebaseApp);



// global.coins = coins;

const Todo = ({navigation}) => {
  const [task, setTask] = useState(null);
  const [taskItems, setTaskItems] = useState([])
  const [doneItems, setDoneItems] = useState([])
  const [todoTab, setTodoTab] = useState(1);
  const [coins, setCoins] = useState(global.coins);
  
  let email = global.email;
  
  //getting collection reference
  const colRef = collection(db, `Users/${email}/ToDoList`);

  const colRef1 = collection(db, `Users/${email}/CompletedToDoList`);

  
  
  {/*Renders List of unCompleted tasks from database*/}
  useEffect(() => {
    const todos = [];
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          todos.push(doc.id);
        })
      }).then(() => {
        setTaskItems(todos);
      })
  }, []);

  {/*Renders List of Completed tasks from database*/}
  useEffect(() => {
    const todos = []
    getDocs(colRef1)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          todos.push(doc.id);
        })
      }).then(() => {
        setDoneItems(todos);
      })
    
  }, []);

  {/*removes the task from tobe Completed*/}
  const removeFromToDoCollection = (index) => {
    const TaskName = taskItems[index];
    console.log(TaskName);
    addToCompletedCollection(TaskName);
    const docRef = doc(db, `Users/${email}/ToDoList`, TaskName);
    deleteDoc(docRef);
  }

  {/*Removes the task from Done*/}
  const removeDoneCollection = (index) => {
    const TaskName = doneItems[index];
    console.log(TaskName);
    const docRef = doc(db, `Users/${email}/CompletedToDoList`, TaskName);
    deleteDoc(docRef);
  }

  {/*Adds task to Done*/}
  const addToCompletedCollection = (Task) => {
    const taskref = doc(db, `Users/${email}/CompletedToDoList`, Task);
    setDoc(taskref,{});
  }

  const onSelectSwitch = (value) => {
      setTodoTab(value);
  }

  {/*Adds new task*/}
  const handleAddTask = () => {
    if (task == null) {
      alert("Please input a valid task");
    } else {
      setTaskItems([...taskItems, task])
      const taskref = doc(db, `Users/${email}/ToDoList`, task);
      setDoc(taskref,{});
      setTask(null);
    }
  }

  {/*Completes a task*/}
  const completeTask = (index) => {
    doneItems.push(taskItems[index])
    let itemsCopy = [...taskItems];
    removeFromToDoCollection(index);
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    global.updateCoins(10);
    setCoins(global.coins);
  }

  const deleteDone = (index) => {
    let doneCopy = [...doneItems];
    removeDoneCollection(index);
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
    borderTopColor: "#dcdcdc", borderTopWidth: 1
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  tasksWrapper: {
    paddingTop: 10,
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