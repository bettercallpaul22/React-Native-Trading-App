  // "@react-navigation/material-bottom-tabs": "^6.2.19",
    // "@react-navigation/material-top-tabs": "^6.6.5",


    import {
        ActivityIndicator,
        Dimensions, Image,
        TouchableOpacity, StyleSheet,
        Text, View,
        ScrollView,
        RefreshControl,
        Alert,
        BackHandler,
        StatusBar,
        SafeAreaView
    } from 'react-native'
    import React, { useCallback, useRef, useState } from 'react'
    import Animated, { interpolate } from 'react-native-reanimated'
    import { color } from '../../assets/misc/colors'
    import { fontSize } from '../../assets/misc/others'
    import { useGet_all_productsQuery, useLazyGet_all_productsQuery } from '../services/api/productApiSlice'
    import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
    const { height, width } = Dimensions.get('window')
    const SPACING = 20
    const CARD_HEIGHT = 150
    import { Entypo } from '@expo/vector-icons';
    import { useDispatch, useSelector } from 'react-redux'
    import { Product } from '../../model'
    import { selectCurrentToken } from '../services/features/userSlice'
    
    const slider_width = width * 0.7
    
    
    
    
    const HomeScreen = () => {
        console.log("home page")
        const { isLoading, data, isError, error } = useGet_all_productsQuery()
        const navigator = useNavigation<NavigationProp<any>>()
        const token = useSelector(selectCurrentToken)
        const [refreshing, setRefreshing] = useState(false);
        const [fetch_products, { isLoading: lasyLoading }] = useLazyGet_all_productsQuery()
        const scrollY = React.useRef(new Animated.Value(0)).current;
        const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    
    
    
        const onRefresh = useCallback(() => {
            setRefreshing(lasyLoading);
            fetch_products()
            setTimeout(() => {
                setRefreshing(lasyLoading);
            }, 5000);
        }, []);
    
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
    
    
        if (!token) {
            navigator.navigate('Login', { replace: true })
        }
    
    
        if (isLoading) return <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:color.NEW_BACKGROUND_COLOR
    
            }}
        >
            <ActivityIndicator size="large" color={"purple"} />
        </View>
    
        if (isError) return <ScrollView
            style={{ flex: 1, }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Something went wrong please pull down to refresh</Text>
            </View>
        </ScrollView>
    
        return (
            <SafeAreaView style={{ backgroundColor: color.NEW_BACKGROUND_COLOR, flex: 1 }}>
                <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} barStyle="dark-content" />
    
                <Animated.FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    maxToRenderPerBatch={12}
                    contentContainerStyle={{ padding: SPACING, }}
                    data={data}
                    renderItem={({ item, index }) => {
                        const ITEM_SIZE = CARD_HEIGHT + SPACING
                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index, // when the items reaches the top edge
                            ITEM_SIZE * (index + 4)  // animation should finish after srolling two items
                        ]
    
                        const outputRange = [1, 1, 1, 0]
    
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange
                        })
    
                        const opacity = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, -20]
                        })
    
                        return <AnimatedTouchable
                            style={[styles.item_card, { transform: [{ scale, }], }]}
                            onPress={() => {
                                navigator.navigate('ProductDetails2', { data: item })
                            }}
                        >
                            {item.product_condition === "Fairy Used" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 20 }}
                            >{item.product_condition}</Text>}
    
                            {item.product_condition === "New With Tag" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 20 }}
                            >{item.product_condition}</Text>}
    
                            {item.product_condition === "New" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 20 }}
                            >{item.product_condition}</Text>}
                            <View style={styles.image_container}>
    
                                <Image
                                    resizeMode='contain'
                                    style={styles.image}
                                    // source={require('../../assets/images/Egypt.png')}
                                    source={{ uri: item.images[0]['image'] }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="location-pin" size={22} color="black" />
                                    <Text style={{ fontWeight: '600', color: 'gray' }}>lagos Ng</Text>
                                </View>
                            </View>
    
                            <View style={{ flex: 2, paddingTop: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: fontSize.xm, fontWeight: '500' }}>Product name</Text>
                                    <Text style={styles.item_name}>{item.product_name}</Text>
                                </View>
    
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: fontSize.xm, fontWeight: '500' }}>Product value</Text>
                                    <Text style={styles.item_name}> ₦{item.product_price}</Text>
                                </View>
    
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <Text style={{ fontSize: fontSize.xm, fontWeight: '500' }}>Owner</Text>
                                <Text style={styles.item_name}>Obaro Paul</Text>
                            </View> */}
    
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: fontSize.xm, fontWeight: '500' }}>Deal Type</Text>
                                    <Text style={styles.item_name}>{item.deal_type}</Text>
                                </View>
                                <Text style={styles.item_desc}>{item.product_desc}</Text>
                            </View>
    
                        </AnimatedTouchable>
    
                    }}
                />
            </SafeAreaView>
        )
    }
    
    export default HomeScreen
    
    const styles = StyleSheet.create({
    
        item_card: {
            padding: 5,
            elevation: 10,
            backgroundColor: color.NEW_BACKGROUND_COLOR,
            shadowColor: "#000",
            shadowOffset: { height: 20, width: 0 },
            height: CARD_HEIGHT,
            marginBottom: 20,
            borderRadius: 5,
            shadowOpacity: 2,
            shadowRadius: 20,
            // justifyContent: 'flex-start'
            flexDirection: 'row',
            gap: 10
        },
        image_container: {
            height: '100%',
            // width: 120,
            flex: 1,
            // backgroundColor: 'yellow',
    
        },
        image: {
            height: 120,
            width: '100%',
            marginBottom: -15
        },
        item_name: {
            fontSize: fontSize.xm,
            fontWeight: '600'
    
        },
        item_desc: {
            fontSize: fontSize.sm - 4,
            fontWeight: '600',
            color: 'gray',
            maxWidth: 250
    
        },
        condition_text: {
            fontSize: fontSize.xm,
            fontWeight: '500',
            color: 'gray',
            position: 'absolute',
            right: 0
        }
    
    })
    // const styles = StyleSheet.create({
    //     container: {
    //         flex: 1,
    //         backgroundColor: color.NEW_BACKGROUND_COLOR
    //     },
    //     header: {
    //         width: '100%',
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         paddingHorizontal: 10,
    //         elevation: 10,
    //         backgroundColor: color.NEW_BACKGROUND_COLOR,
    //         shadowColor: "#000",
    //         shadowOffset: { height: 10, width: 0 },
    //         height: 50,
    //         marginBottom: 20,
    //         borderRadius: 5,
    //         shadowOpacity: 1,
    //         shadowRadius: 20
    //     },
    //     headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16, },
    
    //     main_wrapper: {
    //         padding: 20,
    //         flex: 1,
    
    //     },
    //     item_card: {
    //         height: height / 2,
    //         marginBottom: 20,
    //     },
    
    //     container2: {
    //         flex: 1,
    //         position: 'absolute',
    //         // alignItems: 'center',
    //         // justifyContent: 'center',
    //         // padding: 16,
    //         backgroundColor: "rgba(0, 0, 0, 0.3)",
    //         // backgroundColor: "rgba(0, 0, 0, 0,0)",
    //         height,
    //         width: '100%',
    //         zIndex: 1,
    
    
    //         // ...StyleSheet.absoluteFillObject,
    //     },
    
    
    //     navigationContainer: {
    //         backgroundColor: color.NEW_BACKGROUND_COLOR,
    
    //     },
    //     paragraph: {
    //         padding: 16,
    //         fontSize: 15,
    //         textAlign: 'center',
    //     },
    // })