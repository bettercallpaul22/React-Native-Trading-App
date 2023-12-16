import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// const Tab = createBottomTabNavigator()
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize } from '../../assets/misc/others';
import { color } from '../../assets/misc/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestRecieved from './RequestRecieved';
import RequestSent from './RequestSent';

const Tab = createMaterialTopTabNavigator();




const Request = () => {
    return (
        //   <View style={{backgroundColor:'teal'}}>
        <Tab.Navigator
            keyboardDismissMode='on-drag'
            backBehavior='none'
            tabBarPosition='top'
            screenOptions={{
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'black',
                tabBarContentContainerStyle: { backgroundColor: color.NEW_BACKGROUND_COLOR },
                animationEnabled: true,
                // tabBarBounces:true
                tabBarPressColor: 'rgb(216,191,216)'
            }}
            sceneContainerStyle={{ backgroundColor: 'teal' }}
        >
            <Tab.Screen name="Receive" component={RequestRecieved} />
            <Tab.Screen name="Sent" component={RequestSent} />
        </Tab.Navigator>
        // </View>
    )
}

export default Request

const styles = StyleSheet.create({
    header: {
        // width:'100%',
        // alignItems:'center',
        // justifyContent:'center',
        elevation: 10,
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        shadowColor: "#000",
        shadowOffset: { height: 10, width: 0 },
        height: 50,
        borderRadius: 5,
        shadowOpacity: 1,
        shadowRadius: 20
    },
    headerTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end'
    },

})
