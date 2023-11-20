import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screen/HomeScreen'
import ListItem from './screen/ListItem'
import { color } from '../assets/misc/colors'
import { AntDesign } from '@expo/vector-icons';
import { fontSize } from '../assets/misc/others';


const Tab = createBottomTabNavigator()

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',

            tabBarBackground: () => <View
                style={{
                    backgroundColor: color.NEW_BACKGROUND_COLOR,
                    height: 50,
                    // borderTopWidth: 1,
                    // borderColor: 'purple',
                }} />,

            tabBarLabelStyle: { fontWeight: '600', fontSize: fontSize.xm },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'black'
        }}
        >

            <Tab.Group  >
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="home" size={24} color={focused ? "purple" : "black"} />
                        )
                    }}
                />

                <Tab.Screen
                    name='ListItem'
                    component={ListItem}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="plus" size={24} color={focused ? "purple" : "black"} />
                        )
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

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








