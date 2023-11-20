import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { event, interpolateColors, useAnimatedStyle } from 'react-native-reanimated'

const data = [
  "Nigeria",
  "Egypt",
  "Mali",
  "Ghana",
  "Togo",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",
  "Mali",

]

const { width, height } = Dimensions.get('window')
console.log("screen height", height)
const CARD_HEIGHT = 100
const Test = () => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const [yAxisScroll, setyAxisScroll] = useState<any>()
  const [sty, setsty] = useState<any>()


  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: sty,
    };
  });



  return (
    <View style={styles.conatainer}>
      <Animated.FlatList
        scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
        )}
        style={{ backgroundColor: 'plum' }}
        data={data}
        keyExtractor={(item_, index) => index.toString()}
        contentContainerStyle={{ padding: 20, }}

        renderItem={({ item, index }) => {
          const ITEM_SIZE = CARD_HEIGHT + 20


          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index, //when the items reaches the top edge
            ITEM_SIZE * (index + 4)  // animation should finish after srolling two items
          ]


          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, -0.2]
          })
          
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, -4]
          })

         

          // const backgroundColor = Animated.interpolateNode(scrollY, {
       
          return <Animated.View 
          style={[styles.item_container,  { transform: [{ scale }, ] }, {opacity}]}
          >
            <View>
              <Text>{yAxisScroll}  index : {index} </Text>
              <Text>iItem height {ITEM_SIZE * index} </Text>

            </View>
          </Animated.View>
        }}
      />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    // padding: 20
  },
  item_container: {
    backgroundColor: 'whitesmoke',
    marginBottom: 20,
    height: CARD_HEIGHT,
  }
})