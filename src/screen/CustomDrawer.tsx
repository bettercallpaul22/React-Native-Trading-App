import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { color } from '../../assets/misc/colors';
import { fontSize } from '../../assets/misc/others';

const { width, height } = Dimensions.get('screen')
const profile_header_height = height / 5
const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.profile_header}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={styles.image_frame}>
                        <Image
                            style={{ height: 80, width: 80, borderRadius: 100 }}
                            source={require('../../assets/images/profile.png')}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.profile_name_text}>JOHN DOE</Text>
                    <Text style={styles.profile_name_text}>@JOHNDOE1955</Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>

                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontWeight: '500' }}>1,200</Text>
                            <Text>Following</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontWeight: '500' }}>500</Text>
                            <Text>Followers</Text>
                        </View>
                    </View>
                </View>

            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.NEW_BACKGROUND_COLOR
    },
    profile_header: {
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        height: profile_header_height,
        borderBottomWidth: 1,
        borderColor: 'purple'
    },
    image_frame: {
        height: 85,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
        borderRadius: 100
    },
    
    profile_name_text: {
        fontWeight: '600',
        fontSize: fontSize.xm,
        letterSpacing: 2
    }
})