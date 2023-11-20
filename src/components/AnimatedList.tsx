import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { ImageProps,  } from 'expo-image'

import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
const { width, height } = Dimensions.get('screen')
// const item_width = windowWidth / 3

type Prps = {
    imageSrc: any;
    // imageSrc: ImageProps['source'];
    index: number;
    content_offset_x: Animated.SharedValue<number>;

}





const AnimatedList: React.FC<Prps> = ({ imageSrc, index, content_offset_x }) => {




    const reanimated_style = useAnimatedStyle(() => {
        const input_RANGE = [(index - 1) * width, index * width, (index + 1) * width]
        const output_RANGE = [0.5, 2, 0.5,]

        const scale = interpolate(
            content_offset_x.value, // 0 - 1963
            input_RANGE,
            output_RANGE,
            Extrapolation.CLAMP
        )


        return {
            transform: [
                {
                    scale: scale,
                },
                {
                    translateY: scale,
                },

            ]
        }
    })




    return (
        <View>

            <Animated.View
                style={[
                    {
                        width,
                        height,
                        alignItems:'center',
                        justifyContent:'center'
                    },
                    // reanimated_style
                ]}
            >
                <Image
                resizeMode='contain'
                    source={imageSrc}
                    style={{
                        width:'70%',
                        // aspectRatio:1,
                        flex: 0.6,
                        // borderRadius:200
                       
                        
                    }}
                />
            </Animated.View>
        </View>

    )
}

export default AnimatedList

const styles = StyleSheet.create({})