import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screen/Register';
import ProductView from './src/screen/ProductView';
import HomeTabs from './src/screen/HomeTabs';
import { Provider } from 'react-redux';
import { store } from './src/services/store';
import { PaperProvider } from 'react-native-paper';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfig, BubbleTabBarItemConfig } from '@gorhom/animated-tabbar';
import { color } from './assets/misc/colors';

// const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabs: TabsConfig<BubbleTabBarItemConfig> = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: () => <AntDesign name="stepforward" size={24} color="black" />,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },


  Login: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: () => <AntDesign name="stepforward" size={24} color="black" />,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};









function App() {


  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center'

          }}
        
          >
            <Stack.Screen name='HomeTabs' component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name='ProductView' component={ProductView}/>
            <Stack.Screen name='Register' component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
