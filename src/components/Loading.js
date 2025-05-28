import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    // <View className="flex-1 justify-center items-center">
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
        <ActivityIndicator {...props} />
    </View>
  )
}