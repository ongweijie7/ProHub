import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>{props.friend.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, color: '#B7B7B7', marginRight: 5}}>{props.friend.coins}</Text>
                    <FontAwesome5 name="coins" size={14} color='#B7B7B7' style={{marginTop: 4}}/>                    
                </View>
            </View>
            <Text style={{fontWeight: 'bold',
                          fontSize: 24,
                            color: props.index == 0 ? '#CDCDCD' 
                                : (props.index == 1 ? '#AB7100' : 'black')}}>
                {props.index + 2}
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