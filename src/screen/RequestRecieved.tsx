import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../assets/misc/colors'

const RequestRecieved = () => {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.box}>

      </View>
    </SafeAreaView>
  )
}

export default RequestRecieved

const styles = StyleSheet.create({
  container:{
    backgroundColor:color.NEW_BACKGROUND_COLOR,
    flex:1,
    padding:20
  },

  box:{
    backgroundColor:'teal',
    height:100,
    width:'100%'
  }
})