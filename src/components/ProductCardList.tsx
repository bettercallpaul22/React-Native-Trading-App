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
const CARD_HEIGHT = 150
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'


const ProductCardList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch()
    const navigator = useNavigation<NavigationProp<any>>()
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const { isLoading, data: product_data, isError, error } = useGet_all_productsQuery()
    const [fetch_products, { isLoading: lasyLoading }] = useLazyGet_all_productsQuery()
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


    const onRefresh = useCallback(() => {
        setRefreshing(lasyLoading);
        fetch_products()
        setTimeout(() => {
            setRefreshing(lasyLoading);
        }, 5000);
    }, []);
    
    if (isLoading) return <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'

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
        <View style={{ backgroundColor: color.NEW_BACKGROUND_COLOR, }}>

            <Animated.FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true },
                )}
                maxToRenderPerBatch={12}
                contentContainerStyle={{ padding: SPACING, }}
                data={product_data}
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
        </View>
    )
}

export default ProductCardList

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