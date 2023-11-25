import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screen/Register';
import ProductDetails from './src/screen/ProductDetails';
import ProductDetails2 from './src/screen/ProductDetails2';
import { Provider } from 'react-redux';
import {  persistor, store } from './src/services/store';
import { PaperProvider } from 'react-native-paper';
import { color } from './assets/misc/colors';
import { AuthService } from './src/services/authServices';

import { selectCurrentToken, selectCurrentUser, setCredientials } from './src/services/features/userSlice';
import { PersistGate } from 'redux-persist/integration/react';
import { AnyAction } from '@reduxjs/toolkit';
import Login from './src/screen/Login';
import ButtomTabs from './src/BottomTabNavigator'


const Stack = createNativeStackNavigator();








const App = () => {
  const authService = new AuthService()
  const [token, settoken] = React.useState('')
  
  const get_token = async()=>{
    const token = await authService.getUserToken() as string
    if(token !== null){
      settoken(token)
    }
  }
  React.useEffect(()=>{
    // get_token()
  },[])




  return (
    <PaperProvider>
      <NavigationContainer>
        <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Stack.Navigator screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerShown:false,
          }}>
           <Stack.Screen name='ButtomTabs' component={ButtomTabs} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: true }}/>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: true }}/>
            <Stack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: true }} />
            <Stack.Screen name='ProductDetails2' component={ProductDetails2} options={{ headerShown: true }} />
          </Stack.Navigator>
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}


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
