import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageProps, Image } from 'expo-image'
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AnimatedList from './AnimatedList';
import PaginationDot from './PaginationDot';

type CarouselPropsType = {
    data: ImageProps['source'][];
}

const { width: windowWidth } = Dimensions.get('screen')
const item_width = windowWidth / 1.8


const CircularCarousel: React.FC<CarouselPropsType> = ({ data }) => {
    const [currentIndex, setcurrentIndex] = useState<any>()
    const [scrollx, setScrollX] = useState<any>()
    const content_offset_x = useSharedValue(0)

    const reanimated_style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: 0,
                }
            ]
        }
    })



    return (
        <>
            <FlatList
            // snapToAlignment='center'
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                style={{ height: 300, position: 'absolute', top: 100 }}
                horizontal
                snapToAlignment='center'
                // decelerationRate={'normal'}
                snapToInterval={windowWidth}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}  //60fps
                onScroll={(event) => {
                    content_offset_x.value = event.nativeEvent.contentOffset.x
                    setScrollX(event.nativeEvent.contentOffset.x)
                    // console.log(event.nativeEvent.contentOffset.x)
                }}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {

                    return <AnimatedList imageSrc={item} index={index} content_offset_x={content_offset_x} />

                }}
            />
            <PaginationDot data={data} content_offset_x={content_offset_x}  />

        </>
    )
}

export default CircularCarousel

const styles = StyleSheet.create({})