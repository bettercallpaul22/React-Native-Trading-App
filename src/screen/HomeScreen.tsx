import {
    Alert, BackHandler, Button, Dimensions, DrawerLayoutAndroid, Image, Pressable, SafeAreaView,
    StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedbackComponent, View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../components/Header'
import { color } from '../../assets/misc/colors'
import ProductCardList from '../components/ProductCardList'
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { persistor, store } from '../services/store';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/features/userSlice'
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window')
const slider_width = width * 0.7
const HomeScreen = () => {
    const navigator = useNavigation<NavigationProp<any>>()
    const token = useSelector(selectCurrentToken)


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {

                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
        'right',
    );
    const changeDrawerPosition = () => {
        if (drawerPosition === 'left') {
            setDrawerPosition('right');
        } else {
            setDrawerPosition('left');
        }
    };

    if (!token) {
        navigator.navigate('Login', { replace: true })
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} barStyle="dark-content" />
            {/* <View style={[styles.header,]}>
                <View style={{ height: 50, width: 50 }}></View>
                <Text style={styles.headerTitle}>POSTS</Text>
                <TouchableOpacity>
                    <Ionicons name="settings-outline" size={26} color="black" />
                </TouchableOpacity>
            </View> */}
            <ProductCardList />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.NEW_BACKGROUND_COLOR
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        elevation: 10,
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        shadowColor: "#000",
        shadowOffset: { height: 10, width: 0 },
        height: 50,
        marginBottom: 20,
        borderRadius: 5,
        shadowOpacity: 1,
        shadowRadius: 20
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16, },

    main_wrapper: {
        padding: 20,
        flex: 1,

    },
    item_card: {
        height: height / 2,
        marginBottom: 20,
    },

    container2: {
        flex: 1,
        position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        // backgroundColor: "rgba(0, 0, 0, 0,0)",
        height,
        width: '100%',
        zIndex: 1,


        // ...StyleSheet.absoluteFillObject,
    },


    navigationContainer: {
        backgroundColor: color.NEW_BACKGROUND_COLOR,

    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
})