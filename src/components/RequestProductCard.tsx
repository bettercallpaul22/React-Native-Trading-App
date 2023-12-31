import {
    ActivityIndicator,
    Dimensions, Image,
    TouchableOpacity, StyleSheet,
    Text, View,
    ScrollView,
    RefreshControl
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Animated, { interpolate } from 'react-native-reanimated'
import { color } from '../../assets/misc/colors'
import { fontSize } from '../../assets/misc/others'
import { useGet_all_productsQuery, useLazyGet_all_productsQuery } from '../services/api/productApiSlice'
import { NavigationProp, useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('window')
const SPACING = 20
const CARD_HEIGHT = 115
import { Entypo, FontAwesome,Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { Offer, Product, User } from '../../model'
import { selectCurrentToken, selectCurrentUser } from '../services/features/userSlice'

interface OfferData {
    data: Offer[];
}

const RequestProductCard: React.FC<OfferData> = ({ data }) => {
    const current_user: User = useSelector(selectCurrentUser)
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch()
    const navigator = useNavigation<NavigationProp<any>>()
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const { isLoading, data: product_data, isError, error } = useGet_all_productsQuery()
    const [fetch_products, { isLoading: lasyLoading }] = useLazyGet_all_productsQuery()
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


    // const onRefresh = useCallback(() => {
    //     setRefreshing(lasyLoading);
    //     fetch_products()
    //     setTimeout(() => {
    //         setRefreshing(lasyLoading);
    //     }, 5000);
    // }, []);

    // if (isLoading) return <View
    //     style={{
    //         flex: 1,
    //         alignItems: 'center',
    //         justifyContent: 'center'

    //     }}
    // >
    //     <ActivityIndicator size="large" color={"purple"} />
    // </View>

    // if (isError) return <ScrollView
    //     style={{ flex: 1, }}
    //     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    // >
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <Text>Something went wrong please pull down to refresh</Text>
    //     </View>
    // </ScrollView>

    // const filter_product = product_data.filter((product) => product.owner_id === current_user._id)


    return (
        <View style={{ backgroundColor: color.NEW_BACKGROUND_COLOR, }}>

            <Animated.FlatList
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                            navigator.navigate('RequestReceivedDetails')
                        }}
                    >
                        {item.type === 'trade' && (<>
                            <View style={styles.customer_info_container}>
                                <View style={styles.customer_info}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.customer_img}
                                        source={{ uri: item.customer.avatar }}
                                    />

                                    <View >
                                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        <Ionicons name="ios-person" size={12} color="black" />
                                            <Text style={{ fontSize: fontSize.xm - 2.5, fontWeight: '600' }}>{item.customer.firstName} {item.customer.lastName}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                            <Entypo name="location-pin" size={12} color="black" />
                                        <Text style={{ fontSize: fontSize.xm - 2.5, fontWeight: '600' }}>{item.customer.city} {item.customer.state}</Text>

                                        </View>


                                    </View>
                                </View>
                                <View style={{ flex: 1, gap: 3 }}>
                                    <View style={styles.product_info_left} >
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600' }}>Product Name:</Text>
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', }}>{item.product_name}</Text>
                                    </View>
                                    <View style={styles.product_info_left} >
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600' }}>Product Value:</Text>
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', }}>{item.product_value}</Text>
                                    </View>
                                    <View style={styles.product_info_left} >
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600' }}>Product Condition:</Text>
                                        <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', }}>{item.product_condition}</Text>
                                    </View>
                                    <View style={ styles.product_info_left}>
                                    <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', }}>Status:</Text>
                                    <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', }}>Pending</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={styles.product_info}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', position: 'absolute', zIndex: 1, top: 2 }}>Their Item</Text>
                                    {/* <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', position: 'absolute', zIndex: 1, top: 5 }}>Value: 27,000</Text> */}

                                    <Image
                                        resizeMode='cover'
                                        style={styles.trade_img}
                                        source={{uri:item.images[0].image}}
                                    />
                                </View>
                                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome name="exchange" size={16} color="purple" />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', position: 'absolute', zIndex: 1, top: 2 }}>Your Item</Text>
                                    {/* <Text style={{ fontSize: fontSize.xm - 4, fontWeight: '600', position: 'absolute', zIndex: 1, top: 5 }}>Value: 276,000</Text> */}

                                    <Image
                                        resizeMode='cover'
                                        style={styles.trade_img}
                                        source={{uri:item.product.images[0].image}}
                                    />
                                </View>
                            </View>
                        </>)}





                        {item.type === 'trade' && (
                            <View>

                            </View>
                        )}


                    </AnimatedTouchable>

                }}
            />
        </View>
    )
}

export default RequestProductCard

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


    customer_info_container: {
        // backgroundColor: 'teal',
        flex: 0.8,
        // flexDirection: 'row'
    },
    customer_info: {
        // backgroundColor:'teal',
        height: CARD_HEIGHT / 2.8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 2
    },

    product_info: {
        // backgroundColor: 'pink',
        flex: 0.8,
        flexDirection: 'row'

    },

    customer_img: {
        height: 30,
        width: 30,
        borderRadius: 50

    },
    trade_img: {
        height: 70,
        width: 70,
        borderRadius: 3

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
        fontWeight: '500',
        color: 'gray',
        position: 'absolute',
        right: 10,
        bottom: 10,
        paddingHorizontal: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    product_info_left: {
        justifyContent: 'space-between',
         flexDirection: 'row',
          gap: 10, overflow: 'hidden',
          borderBottomColor:'purple',
          borderBottomWidth:0.5
    }


})