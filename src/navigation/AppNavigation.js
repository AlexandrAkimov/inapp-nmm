import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { headerCommonOptions } from './configs/header-config';
import { THEME } from '../theme';
import LoginScreen from '../screens/LoginScreen';
import MainNavigator from './navigators/MainNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../screens/MainScreen';
import { checkAuth } from '../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/ui/Loading';
import {navigationRef} from './RootNavigation'
import { Switch } from 'react-native-elements';
import { View, Text } from 'react-native';



const Drawer = createDrawerNavigator();

function AppNavigation() {
  const [darkTheme, toggleDarkTheme] = useState(false)
  const isAuth = useSelector(state => state.isAuth.isAuth)
  const loading = useSelector(state => state.loading.loading)

  const LightTheme = {
    dark: false,
    colors: {
      primary: THEME.MAIN_COLOR,
      background: 'rgb(242, 242, 242)',
      card: THEME.MAIN_COLOR,
      text: '#fff',
      textContent: '#0E1821',
      border: 'red',
      notification: '#fff',
    },
  };
  const DarkTheme = {
    dark: false,
    colors: {
      primary: THEME.DARK_COLOR,
      background: THEME.TETRIARY_DARKEN_COLOR,
      card: THEME.DARK_COLOR,
      text: '#fff',
      textContent: '#0E1821',
      border: 'red',
      notification: THEME.MAIN_COLOR,
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{color: darkTheme ? '#fff' : '#000'}}
          label="Log Out"
          icon={({ focused, color, size }) => (
            <Ionicons name="log-out-sharp" size={25} color={darkTheme ? color: undefined}/>
          )}
          onPress={async () => {
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
          }}
        />
        <View style={{width: '100%', alignItems: 'flex-start', paddingLeft: 20, marginTop: 30}}>
          <Text style={{color: darkTheme ? '#fff': '#000', marginBottom: 5}}>Toggle Theme</Text>
          <Switch theme={LightTheme} value={darkTheme} onChange={() => toggleDarkTheme(prev => prev = !prev)}/>
        </View>
        
      </DrawerContentScrollView>
    );
  }

  let template

  if (loading) {
    template = <Drawer.Screen
      name="Loading"
      component={Loading}
      options={(navigation, route) => ({
        drawerLabel: 'Loading...',
        drawerIcon: (info) => (
          <Ionicons name="log-out-sharp" size={25} color={info.color} onPress={() => {
          }} />
        ),
        title: 'Loading...',
        headerShown: true,
      })}
    />
  } else if (!isAuth && !loading) {
    template = <>
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={(navigation, route) => ({
          drawerLabel: 'Log Out',
          drawerIcon: (info) => (
            <Ionicons name="log-out-sharp" size={25} color={info.color} onPress={() => {
  
            }} />
          ),
          title: 'Login',
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="Apps"
        component={MainScreen}
      />
    </>
  } else {
    template = <>
      <Drawer.Screen
        name="Apps"
        component={MainNavigator}
        options={(navigation, route) => ({
          drawerIcon: (info) => (
            <Ionicons name="home" size={25} color={info.color} />
          ),
          drawerLabel: 'Home',
          headerShown: false
        })}
      />
    </>
  }
  return (
    <NavigationContainer ref={navigationRef} theme={darkTheme ? DarkTheme : LightTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerType: 'back',
          drawerActiveBackgroundColor: THEME.MAIN_COLOR,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: darkTheme ? '#fff' : '#000',
          drawerStyle: {
            backgroundColor: darkTheme ? THEME.DARK_COLOR : '#fff',
          },
        }}>

        {template}

      </Drawer.Navigator>
    </NavigationContainer >
  );
}

export default AppNavigation;