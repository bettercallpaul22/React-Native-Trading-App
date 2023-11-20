import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../components/Header'
import { color } from '../../assets/misc/colors'
import ProductCardList from '../components/ProductCardList'
import { useGet_all_productsQuery } from '../services/api/productApiSlice'

const { height, width } = Dimensions.get('window')

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
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
    main_wrapper: {
        padding: 20,
        flex: 1,

    },
    item_card: {
        height: height / 2,
        marginBottom: 20,
    }
})