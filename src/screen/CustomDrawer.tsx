import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { color } from '../../assets/misc/colors';
import { fontSize } from '../../assets/misc/others';
import { persistor, store } from '../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../services/features/userSlice';
import { User } from '../../model';
import { Ionicons } from '@expo/vector-icons';
import { AuthService } from '../services/authServices';
const { width, height } = Dimensions.get('screen')
const profile_header_height = height / 5



const CustomDrawer = (props) => {
    const authService = new AuthService()
    const dispatch = useDispatch()
    const user: User = useSelector(selectCurrentUser)
    // console.log("user", user === null)


// console.log("persist", persistor.purge())

    return (
        <DrawerContentScrollView {...props} style={styles.container}
            contentContainerStyle={{
                flex: 1,

            }}>
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
                    <Text style={styles.profile_name_text}>
                        {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
                    </Text>
                    <Text style={styles.profile_name_text}>@{user?.email.split("@")[0].toUpperCase()}</Text>
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
            <TouchableOpacity
                onPress={() => { 
                    authService.clearUser()
                    dispatch(logOut())
                    // persistor.purge().then((res)=>console.log('persist purge res', res))
                    // .catch((err)=>console.log('err', err))
                 }}
                style={{ 
                    backgroundColor:'rgb(216,191,216)',
                     position: 'absolute',
                      bottom: 20,
                       left: 20,
                       flexDirection:'row',
                       gap:10,
                       alignItems:'center',
                       borderRadius:5,
                       padding:5
                     }}
            >
                <Ionicons name="exit-outline" size={24} color="black" />
                <Text style={{ fontSize: fontSize.sm, fontWeight:'600', letterSpacing:2 }}>LOGOUT</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        flex: 1,
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