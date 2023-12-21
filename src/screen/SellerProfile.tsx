import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { color } from '../../assets/misc/colors'
import { fontSize } from '../../assets/misc/others'
import { Entypo } from '@expo/vector-icons';
import ProductCardList from '../components/ProductCardList';
import { ScrollView } from 'react-native-virtualized-view'
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/features/userSlice';
import { User } from '../../model';
import UserProductCard from '../components/UserProductCard';
import { useGet_user_productsQuery } from '../services/api/productApiSlice';
import Loading from '../components/Loading';
import { useRoute } from '@react-navigation/native';
import RequestSent from './RequestSent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const { width } = Dimensions.get('screen')
const Tab = createMaterialTopTabNavigator();

const SellerProfile = () => {
  const { params } = useRoute()
  const seller_profile: User = params['data']
  const user: User = useSelector(selectCurrentUser)
  const { isLoading, data, isError } = useGet_user_productsQuery({ owner_id:seller_profile._id  })
  const onRefresh = useCallback(() => {
    // setRefreshing(lasyLoading);
    // fetch_products()
    setTimeout(() => {
      // setRefreshing(lasyLoading);
    }, 5000);
  }, []);

  console.log("seller id", seller_profile._id)




  const RecentPost = () => {
    return (
      <ScrollView contentContainerStyle={{ padding: 20 }} style={{}}>
        <UserProductCard data={data} />
      </ScrollView>
    )
  }


  return (
    <View style={styles.container}>
                <StatusBar backgroundColor={color.NEW_BACKGROUND_COLOR} barStyle="dark-content" />

      {/* <TouchableOpacity
        onPress={() => {

        }}
        style={styles.edit_follow_container}
      >
        <FontAwesome5 name="user-edit" size={22} color="black" />
        <Text style={{ fontSize: fontSize.xm, fontWeight: '600', letterSpacing: 1 }}>EDIT</Text>
      </TouchableOpacity> */}

      {<View style={styles.follow_container} >
        <TouchableOpacity style={{ backgroundColor: 'rgb(216,191,216)', padding: 5, borderRadius: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', letterSpacing: 1 }}>FOLLOWING</Text>
        </TouchableOpacity>
        <Entypo name="mail" size={24} color="black" />
      </View>}

      <View style={{ alignItems: 'center', gap: 5, padding: 20 }}>
        <View style={styles.image_container}>
        {!seller_profile?.avatar ?
            <Image
              style={styles.image}
              source={require('../../assets/images/profile.png')}
            />
            :
            <Image
              style={styles.image}
              source={{uri:seller_profile?.avatar}}
            />
          }
        </View>
        <Text style={styles.profile_name}>{seller_profile?.firstName.toUpperCase()} {seller_profile?.lastName.toUpperCase()}</Text>

        <View style={styles.location_container}>
          <Entypo name="location-pin" size={24} color="gray" />
          <Text style={{ fontWeight: '600', color: 'gray' }}>{seller_profile?.city} {seller_profile?.state} {seller_profile?.country}</Text>
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
        <Text style={styles.bio}>{seller_profile?.bio}</Text>
      </View>
      {/* <Text style={{ marginLeft: 20, fontWeight: '600', fontSize: fontSize.lg, }}>Recent Post</Text>
      <View style={{ width, borderWidth: 0.5, borderColor: 'purple' }}></View> */}
     
      <Tab.Navigator
        style={{ paddingTop: 20 }}
        keyboardDismissMode='on-drag'
        backBehavior='none'
        tabBarPosition='top'

        screenOptions={{
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
          tabBarContentContainerStyle: { backgroundColor: color.NEW_BACKGROUND_COLOR },
          animationEnabled: true,
          // tabBarBounces:true
          tabBarPressColor: 'rgb(216,191,216)',

        }}
        sceneContainerStyle={{ backgroundColor: color.NEW_BACKGROUND_COLOR }}
      >
        <Tab.Screen name="Recent Post" component={RecentPost} />
        <Tab.Screen name="Likes" component={RequestSent} />
      </Tab.Navigator>
    </View>
  )
}

export default SellerProfile

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
  },
  edit_follow_container: {
    backgroundColor: 'rgb(216,191,216)',
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    zIndex: 1
  },

  follow_container: {

    position: 'absolute',
    top: 20,
    right: 20,
    // flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    zIndex: 1
  }
})