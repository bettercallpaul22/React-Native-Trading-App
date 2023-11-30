import { Dimensions, Image, SafeAreaView,  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../../assets/misc/colors'
import { fontSize } from '../../assets/misc/others'
import { Entypo } from '@expo/vector-icons';
import ProductCardList from '../components/ProductCardList';
import { ScrollView } from 'react-native-virtualized-view'
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('screen')

const Profile = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity
                onPress={() => { 
                
                 }}
                style={{ 
                    backgroundColor:'rgb(216,191,216)',
                     position: 'absolute',
                      top: 20,
                       right: 20,
                       flexDirection:'row',
                       gap:10,
                       alignItems:'center',
                       borderRadius:5,
                       padding:5,
                       zIndex:1
                     }}
            >
                <FontAwesome5 name="user-edit" size={22} color="black" />
                <Text style={{ fontSize: fontSize.xm, fontWeight:'600', letterSpacing:1 }}>EDIT</Text>
            </TouchableOpacity>
      <View style={{ alignItems: 'center', gap: 5, padding: 20 }}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={require('../../assets/images/profile.png')}
          />
        </View>
        <Text style={styles.profile_name}>OBARO PAUL</Text>

        <View style={styles.location_container}>
          <Entypo name="location-pin" size={24} color="gray" />
          <Text style={{ fontWeight: '600', color: 'gray' }}>lagos nigeria</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, width: '100%', }}>

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontWeight: '600' }}>1,200</Text>
            <Text style={{ fontWeight: '600', color: 'gray' }}>Following</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontWeight: '600' }}>500</Text>
            <Text style={{ fontWeight: '600', color: 'gray' }}>Followers</Text>
          </View>
        </View>
        <Text style={styles.bio}>
          In this HTML tutorial,
          you will find more than 200 examples. With our online
          "Try it Yourself" editor, you can edit and test each example yourself!
        </Text>
      </View>
      <Text style={{marginLeft:20, fontWeight:'600', fontSize:fontSize.lg}}>Recent Post</Text>
      <ScrollView contentContainerStyle={{padding:20}} style={{}}>

        <ProductCardList />

      </ScrollView>
      {/* <View>
        <Text>Recent Post</Text>
        
      </View> */}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.NEW_BACKGROUND_COLOR,
    flex: 1,
    // alignItems: 'center',
    // padding: 20,
    gap: 5
  },
  image_container: {
    backgroundColor: 'purple',
    height: 130,
    width: 130,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'

  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 100
  },
  profile_name: {
    fontSize: fontSize.lg,
    letterSpacing: 2,
    fontWeight: '500'

  },
  bio: {
    fontSize: fontSize.xm,
    letterSpacing: 1,
    fontWeight: '500'

  },
  location_container: {
    // backgroundColor: 'plum',
    flexDirection: 'row',
    width: '100%',
    // height:30,
    alignItems: 'center',
  }
})