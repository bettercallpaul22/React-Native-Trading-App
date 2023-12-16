// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import RequestRecieved from './RequestRecieved';
// import RequestSent from './RequestSent';
// import ListItem from './ListItem';
// import HomeScreen from './HomeScreen';
// // import Request from './Request';
// import { Octicons } from '@expo/vector-icons';
// import { color } from '../../assets/misc/colors';

// const Tab = createMaterialBottomTabNavigator();

// const TestTab = () => {
//   return (
//     <Tab.Navigator
//     barStyle={{
//         height:50,
//          backgroundColor: color.NEW_BACKGROUND_COLOR, 
//          alignItems:'center', justifyContent:'center',
//          borderTopWidth:1,
//          borderColor:'purple'
//     }}
//     keyboardHidesNavigationBar
//       screenOptions={{
        
//     }}>
//       <Tab.Screen  
//       options={{ 
//         tabBarIcon:( {color, focused})=>(<Octicons name="home" size={20} color={focused ? "purple" : "black"} />),
    
//      }}  
//       name="HomeScreen" component={HomeScreen} />
//       <Tab.Screen 
//       options={{
//         tabBarIcon:( {color, focused})=>(<Octicons name="home" size={20} color={focused ? "purple" : "black"} />),

//       }} 
//       name="List Item" component={ListItem} />
//       <Tab.Screen
//         options={{
//             tabBarIcon:( {color, focused})=>(<Octicons name="home" size={20} color={focused ? "purple" : "black"} />),
    
//           }} 
//       name="Request" component={Request} />
//     </Tab.Navigator>
//   )
// }

// export default TestTab

// const styles = StyleSheet.create({})