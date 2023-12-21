import { StyleSheet, Text, View } from 'react-native'
import { color } from '../../assets/misc/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header } from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view'
import RequestProductCard from '../components/RequestProductCard';
import { useGet_all_offersQuery, useLazyGet_all_offersQuery } from '../services/api/offerSlice';
import Loading from '../components/Loading'
import { User } from '../../model';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/features/userSlice';
import RequestSentProduct from './RequestSentProduct';
const Tab = createMaterialTopTabNavigator();





const Request = () => {
  const user: User = useSelector(selectCurrentUser)
  const { isLoading, data: offerData, isError } = useGet_all_offersQuery()
  const [lazy_get_offer, { isLoading: lazyLoading }] = useLazyGet_all_offersQuery()



  const RequestSent = () => {
 

    if (isLoading) {
      return (<Loading message='Getting Offers Please Wait...' />)
    }

    if (offerData) {
      const offerSent = offerData?.filter((offer) => offer.customer._id === user?._id)
      return (
        <ScrollView contentContainerStyle={{ padding: 20 }} style={{}}>
          <RequestSentProduct data={offerSent} />
        </ScrollView>
      )

    }
  }


  const RequestReceived = () => {

    if (isLoading) {
      return (<Loading message='Getting Offers Please Wait...' />)
    }
    if (offerData) {
      const offerReceived = offerData?.filter((offer) => offer.product?.owner_id === user?._id)
      return (
        <ScrollView contentContainerStyle={{ padding: 20 }} style={{}}>
          <RequestProductCard data={offerReceived} />
        </ScrollView>
      )

    }

  }


  return (
    <View style={{ backgroundColor: color.NEW_BACKGROUND_COLOR, flex: 1, }}>
      <Header title='Request' />
      <Tab.Navigator
        screenListeners={() => ({
          swipeEnd: () => { lazy_get_offer() },
          swipeStart: () => { lazy_get_offer() },
          tabPress: () => { lazy_get_offer() }
        })}
        // style={{paddingTop:20}}
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
        sceneContainerStyle={{ backgroundColor: color.NEW_BACKGROUND_COLOR, }}
      >
        <Tab.Screen options={{ tabBarActiveTintColor: 'purple', }} name="Request Sent" component={RequestSent} />
        <Tab.Screen name="Request Received" component={RequestReceived} />
      </Tab.Navigator>
    </View>
  )
}

export default Request

const styles = StyleSheet.create({
  header: {
    // width:'100%',
    // alignItems:'center',
    // justifyContent:'center',
    elevation: 10,
    backgroundColor: color.NEW_BACKGROUND_COLOR,
    shadowColor: "#000",
    shadowOffset: { height: 10, width: 0 },
    height: 50,
    borderRadius: 5,
    shadowOpacity: 1,
    shadowRadius: 20
  },
  headerTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end'
  },

})
