import * as React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screen/Register';
import Profile from './src/screen/Profile';
import BottomTabs from './src/tab/BottomTabs';
import ProductDetails2 from './src/screen/ProductDetails2';
import EditProduct from './src/screen/EditProduct';
import TradeListItem from './src/screen/TradeListItem';
import SellerProfile from './src/screen/SellerProfile';
import BottomModal from './src/components/BottomModal';
import EditProfile from './src/screen/EditProfile';
import RequestReceivedDetails from './src/screen/RequestReceivedDetails';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from './src/services/store';
import { PaperProvider } from 'react-native-paper';
import { color } from './assets/misc/colors';
import { AuthService } from './src/services/authServices';

import { PersistGate } from 'redux-persist/integration/react';
import Login from './src/screen/Login';
import CustomDrawer from './src/screen/CustomDrawer';
import ButtomTabs from './src/BottomTabNavigator'
import { User } from './model';
import { fontSize } from './assets/misc/others';
import { selectCurrentUser } from './src/services/features/userSlice';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props: any) => (<CustomDrawer {...props} />)}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        headerShown: false,
        drawerActiveTintColor: 'purple',

      }}
    >

      {/* <Drawer.Screen options={{ headerShown: true }} name='Home' component={ButtomTabs} /> */}
      {/* <Drawer.Screen options={{ headerShown: false }} name='BottomModal' component={BottomModal} /> */}
      <Drawer.Screen options={{ headerShown: false }} name='HomePage' component={BottomTabs} />
      <Drawer.Screen options={{ headerShown: false,  }} name='Profile' component={Profile} />
    </Drawer.Navigator>
  )
}


const App = () => {
  const authService = new AuthService()
  const [user, setuser] = React.useState({})


  const [token, settoken] = React.useState('')

  const get_user_data = async () => {
    const token = await authService.getUserToken() as string
    const user = await authService.getUser() as User
    if (token !== null) {
      settoken(token)
      setuser(user)
    }
  }
  React.useEffect(() => {
    get_user_data()
  }, [])

  // console.log("user", user)
  // console.log("token", token)


  return (
    <PaperProvider>

      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                backgroundColor: color.NEW_BACKGROUND_COLOR,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontWeight: '600', fontSize: fontSize.lg }}>Loading...</Text>
            </View>
          }
          persistor={persistor}
        >

          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerTitleAlign: 'center',
              headerShown: false,
            }}>
              <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{ headerShown: false, }} />
              <Stack.Screen options={{ headerShown: true }} name='Trade' component={BottomTabs} />

              <Stack.Screen name='Register' component={Register} options={{ headerShown: true }} />
              <Stack.Screen name='Login' component={Login} options={{ headerShown: true, headerBackVisible: false }} />
              <Stack.Screen name='ProductDetails2' component={ProductDetails2} options={{ headerShown: true }} />
              <Stack.Screen name='EditProduct' component={EditProduct} options={{ headerShown: true }} />
              <Stack.Screen name='TradeListItem' component={TradeListItem} options={{ headerShown: true }} />
              <Stack.Screen name='SellerProfile' component={SellerProfile} options={{ headerShown: true }} />
              <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: true }} />
              <Stack.Screen name='RequestReceivedDetails' component={RequestReceivedDetails} options={{ headerShown: true }} />

            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  header: {
    elevation: 10,
    backgroundColor: color.NEW_BACKGROUND_COLOR,
    shadowColor: "#000",
    shadowOffset: { height: 10, width: 0 },
    height: 50,
    // marginBottom: 20,
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


export default App
