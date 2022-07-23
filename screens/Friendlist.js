import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { acceptReq, sendReq } from '../Firebasebackend/Friends';

// add/manage/view friends
const Friendlist = (props) => {
    const [email, setemail] = useState("");

    const addFriends = () => {
        if (email === ""){
            alert("Please enter an email");
        } else {
            sendReq(email);
        }

    }

    //global.friends is an array of friend objects
    

    const removeFriend = () => {

    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 20}}>
                {/* ADD Friends button */}
                <TouchableOpacity onPress={addFriends}>
                    <Text style={{color: '#00a2ec', fontWeight: 'bold'}}>ADD FRIENDS</Text>
                </TouchableOpacity>
                <TextInput 
                placeholder={"Email Address"} 
                    value={email} 
                    onChangeText={setemail}
                    style={styles.addFriend}
                /> 
            </View>

            {/* Stack navigator to friend request screen */}
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=> props.navigation.navigate('Friend Requests')}>
               <Image
                source={require('../assets/lr.jpg')}
                style={{height:50, width:50, borderRadius: 25, marginRight: 10}}
              />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 16}}>Friend Requests</Text>
                    <Text style={{opacity: 0.5}}>Approve or ignore requests</Text> 

                </View>

            </TouchableOpacity>


            <View style={styles.line}/>

            <Text style={styles.friendContainer}>ALL FRIENDS</Text>
            <ScrollView>
                {props.route.params.array.map((friend, index) => {
                  return(
                    <View key={index} style={styles.friend}>
                        <View style={{flexDirection: 'row'}}>
                           <Image
                            source={require('../assets/ape.jpg')}
                            style={{height: 50, width: 50, borderRadius: 25}}
                            />
                            <View style={{flexDirection: 'column', padding:10}}>
                               <Text style={{fontSize: 16}}>{friend.name}</Text> 
                               {/* Optional if want to display email address as well update array */}
                                <Text style={{opacity: 0.5}}>@rileyreid</Text> 
                            </View>
                        </View>
                        
                            {/* Remove friend button */}
                          <TouchableOpacity onPress={removeFriend} style={styles.remove}>
                            <Text style={{alignSelf:'center'}}>Remove</Text>
                          </TouchableOpacity>
                    </View>                         
                  )
              })
              }

            </ScrollView>


        </View>
    );
}

export default Friendlist;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 15, 
        backgroundColor: 'white'
    },
    addFriend: {
        width:330, 
        borderColor: '#C0C0C0', 
        borderWidth: 2, 
        padding: 10, 
        borderRadius: 10
    },
    line: {
        borderBottomColor:'#b7b7b7', 
        borderBottomWidth: 1, 
        width: 370, 
        left:-15, 
        marginTop:15
    },
    friendContainer: {
        fontWeight: 'bold', 
        fontSize: 16, 
        marginTop: 15, 
        left: 5
    },
    friend: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical:5, 
        justifyContent:'space-between'
    },
    remove: {
        backgroundColor:'#e6e6e6', 
        justifyContent:'center', 
        borderRadius:7,
        height: 30,
        width: 85,
        alignSelf: 'center'
    }
  })

