import { StyleSheet, Dimensions, View } from 'react-native'
import { ImageProps, Image } from 'expo-image'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import React from 'react'


// type DataDotProp = {
//     data: ImageProps['source'][];
//     content_offset_x: Animated.SharedValue<number>;
// }
type DataDotProp = {
    data:any;
    content_offset_x:any;
}

const { width } = Dimensions.get('screen')


const PaginationDot: React.FC<DataDotProp> = ({ data, content_offset_x }) => {



    return (
        <View style={{
            position: 'absolute',
            flexDirection: 'row',
            marginHorizontal: 10,
            width: 300,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        }}>
            {
                data.map((_, id: number) => {

                    const input_RANGE = [(id - 1) * width, id * width, (id + 1) * width]
                    const output_RANGE = [10, 30, 10,]

                    const dot_width = interpolate(
                        content_offset_x.value, // 0 - 1963
                        input_RANGE,
                        output_RANGE,
                        Extrapolation.CLAMP
                    )

                    return <View style={[styles.dot, { width: dot_width }]} key={id.toString()}></View>
                })
            }
        </View>
    )
}

export default PaginationDot

const styles = StyleSheet.create({
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ccc'
    }
})