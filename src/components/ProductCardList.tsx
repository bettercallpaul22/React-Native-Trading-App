import { ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Animated, { interpolate } from 'react-native-reanimated'
import { color } from '../../assets/misc/colors'
import { fontSize } from '../../assets/misc/others'
import CustoButton from './CustoButton'
import { useGet_all_productsQuery } from '../services/api/productApiSlice'
import { NavigationProp, useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('window')
const SPACING = 20
const CARD_HEIGHT = 150
const image_condition = [
    { New: '../../assets/images/new.png' },
    // {New with Tag: '../../assets/images/new-tag.jpg'},
    { Used: '../../assets/images/used.jpg' },
]



const ProductCardList = () => {
    const navigator = useNavigation<NavigationProp<any>>()
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const { isLoading, data: product_data, isError } = useGet_all_productsQuery()

    // console.log("all products", product_data?.map((product) => product.product_condition))
    if (isLoading) return <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'

        }}
    >
        <ActivityIndicator size="large" />
    </View>

    if (isError) return <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'

        }}
    >
        <Text>Something went wrong please retry</Text>
    </View>


    return (
        <View style={{ backgroundColor: color.NEW_BACKGROUND_COLOR, }}>
            <Animated.FlatList
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

                    return <Animated.View style={[styles.item_card, { transform: [{ scale, }], }]}>
                        <View style={styles.image_container}>
                            {/* {item.product_condition.toLowerCase() === "new" && (<Image
                                resizeMode='cover'
                                style={{ height: 40, width: 40, position: 'absolute', right: 0 }}
                                source={require('../../assets/images/new.png')}
                            />)}

                            {item.product_condition.toLowerCase() === "new with tag" && (<Image
                                resizeMode='cover'
                                style={{ height: 40, width: 40, position: 'absolute', right: 0 }}
                                source={require('../../assets/images/new-tag.jpg')}
                            />)} */}

                            {item.product_condition === "Fairy Used" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 0 }}
                            >{item.product_condition}</Text>}

                            {item.product_condition === "New With Tag" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 0 }}
                            >{item.product_condition}</Text>}
                            
                            {item.product_condition === "New" && <Text
                                style={{ fontWeight: '600', color: 'gray', position: 'absolute', right: 0 }}
                            >{item.product_condition}</Text>}

                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: item.images[0]['image'] }}
                            />

                            <View style={{ padding: 10 }}>
                                <Text style={styles.item_name}>{item.product_name}</Text>
                                <Text style={styles.item_desc}>{item.product_desc}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: fontSize.lg, fontWeight: '500' }}>value</Text>
                                    <Text style={styles.item_name}> ₦{item.product_price}</Text>
                                </View>

                            </View>
                        </View>
                        <CustoButton
                            color={'purple'}
                            title={
                                item.deal_type === 'Cash Sale' ?  // go remove the spacing
                                    'for sale & cash only'
                                    :
                                    item.deal_type === 'Swap & Add Cash' ?

                                        'Swap & add cash'
                                        :
                                        item.deal_type === 'Swap Only' ?
                                            'Swap Only'
                                            : ''
                            }
                            onPress={() => {
                                navigator.navigate('ProductView', {data:item, images:item.images})
                            }}
                        />
                    </Animated.View>
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
        justifyContent: 'flex-start'
    },
    image_container: {
        // height: 90,
        // width: 90,
        // backgroundColor: 'yellow',
        flexDirection: 'row'

    },
    image: {
        height: 90,
        width: 90,

    },
    item_name: {
        fontSize: fontSize.lg,
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