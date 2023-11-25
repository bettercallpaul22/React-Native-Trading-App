import {
    Alert, BackHandler, Button, Dimensions, DrawerLayoutAndroid, Image, Pressable, SafeAreaView,
    StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../components/Header'
import { color } from '../../assets/misc/colors'
import ProductCardList from '../components/ProductCardList'
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const { height, width } = Dimensions.get('window')
const slider_width = width * 0.7
const HomeScreen = () => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const navigator = useNavigation<NavigationProp<any>>()


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

    const drawer = useRef<DrawerLayoutAndroid>(null);
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

    const navigationView = () => (
        <View style={[styles.container2, styles.navigationContainer]}>
            {/* <Text style={styles.paragraph}>I'm in the Drawer!</Text> */}
            <Button
                title="Close drawer"
                onPress={() => drawer.current?.closeDrawer()}
            />
        </View>
    );


    const styleX = useSharedValue(-width)
    // const styleX = new Animated.Value(0)



    // const translatex = styleX.interpolate({
    //     inputRange:[0, 0.5,  1],
    //     outputRange:[-300, -slider_width / 2 , 0],
    // })

    const xt = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(styleX.value, {
                        duration: 400
                    })
                }
            ]
        }
    })

    useEffect(() => {
        navigator.addListener('state', () => { styleX.value = -width })
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            <AnimatedTouchable
                style={[styles.container2, xt]}
                onPress={() => {styleX.value = -width}}
            >
                <View
                style={{height, width:300, backgroundColor:color.NEW_BACKGROUND_COLOR, zIndex:500}}
                >

                </View>
            </AnimatedTouchable >
            <View style={[styles.header,]}>
                <View style={{ height: 50, width: 50 }}></View>
                <Text style={styles.headerTitle}>POSTS</Text>
                <TouchableOpacity onPress={() => { styleX.value = 0 }}>
                    <Image
                        resizeMode="contain"
                        style={{ height: 40, width: 40, borderRadius: 50 }}
                        source={require('../../assets/images/profile.png')}
                    />
                </TouchableOpacity>

            </View>
            <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} barStyle="dark-content" />
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