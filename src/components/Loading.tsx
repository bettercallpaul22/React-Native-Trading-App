import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../assets/misc/colors'

interface LoadingProps{
    message:string;
}


const Loading:React.FC<LoadingProps> = ({message}) => {
  return (
    <View style={{
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text
          style={{
            backgroundColor: 'rgba(0,0,0, 0.7)',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            color: '#fff'
          }}
        >
          {message}
        </Text>
      </View>
  )
}

export default Loading

const styles = StyleSheet.create({})