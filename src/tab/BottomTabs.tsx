import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import HomeScreen from '../screen/HomeScreen';
import ListItem from '../screen/ListItem';
import Request from '../screen/Request';
import { RiHome3Fill } from "react-icons/ri";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color } from '../../assets/misc/colors';




const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (

      <Tab.Navigator barStyle={{backgroundColor:color.NEW_BACKGROUND_COLOR, borderColor:'purple', borderWidth:0.5 }}>
        <Tab.Screen  name="Home" component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name={focused ? "home-minus" : "home-minus-outline"} size={24} color="purple" />
              ),
              
            }}

        />
        <Tab.Screen name="List Items" component={ListItem}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name={focused ? "plus-circle" : "plus-circle-outline"} size={24} color="purple" />
            )
          }}
        />
        <Tab.Screen name="Request" component={Request}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name={focused ? "stack-exchange" : "stack-exchange"} size={24} color="purple" />
            )
          }}
        />
      </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})