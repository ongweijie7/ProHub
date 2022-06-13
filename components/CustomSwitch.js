import React, { useState } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'

export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    onSelectSwitch
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    }

    return (
        <View style={{
            height: 44,
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: '#AD40AF',
            justifyContent: 'center',
            flexDirection: 'row',
        }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1 ? '#0F52BA' : 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: getSelectionMode == 1 ? 'white' : '#0F52BA',
                    fontSize: 14,
                }}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={2}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? '#0F52BA' : 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: getSelectionMode == 2 ? 'white' : '#0F52BA',
                    fontSize: 14,
                }}>{option2}</Text>
            </TouchableOpacity>
        </View>
        
    )
}