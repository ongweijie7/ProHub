import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { addUser } from '../Firebasebackend/LeaderboardBackend';

export default function Friendlist(props) {
    const [emailaddress, setemail] = useState("");
    const add = () => {
        console.log("hello");
        console.log(emailaddress);
        addUser(emailaddress);
    };

    return (
        <View style={{ flex: 1, padding: 15, backgroundColor: 'white' }}>
            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity onPress={add}>
                    <Text style={{ color: '#00a2ec', fontWeight: 'bold' }}>ADD FRIEND</Text>
                </TouchableOpacity >
                <TextInput
                    placeholder={"Email Address"}
                    value={emailaddress}
                    onChangeText={setemail}
                    style={{ width: 330, borderColor: '#C0C0C0', borderWidth: 2, padding: 10, borderRadius: 10 }} />
            </View>

            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { } }>
                <Image
                    source={require('../assets/lr.jpg')}
                    style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 16 }}>Friend Requests</Text>
                    <Text style={{ opacity: 0.5 }}>Approve or ignore requests</Text>
                </View>

            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>FRIENDS</Text>
            <ScrollView style={{ borderWidth: 2, borderColor: '#b7b7b7', borderRadius: 20 }}>
                {props.route.params.array.map((friend, index) => {
                    return (
                        <Text key={index} style={{ padding: 10 }}>{index + 1 + ". " + friend.name}</Text>
                    );
                })}
            </ScrollView>


        </View>
    );
}

