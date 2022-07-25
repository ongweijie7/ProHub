import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>{props.friend.email}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, color: '#B7B7B7', marginRight: 3}}>LV {props.friend.level}</Text>
                    {/* <MaterialCommunityIcons name="star-four-points" size={14} color='#B7B7B7' style={{marginTop: 2}}/> */}
                </View>
            </View>
            <Text style={{fontWeight: 'bold',
                          fontSize: 24,
                            color: props.index == 0 ? '#e4c000' 
                                : (props.index == 1 ? '#CDCDCD' 
                                : (props.index == 2 ? '#AB7100' : 'black'))}}>
                {props.index + 1}
            </Text>
        </View>

        
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 16,
        elevation: 5,
    },
    itemLeft: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },  
})

export default Task;