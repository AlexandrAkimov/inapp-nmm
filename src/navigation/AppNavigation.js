import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

const Drawer = createDrawerNavigator();

function AppNavigation() {
  const isAuth = useSelector(state => state.isAuth.isAuth)
  const loading = useSelector(state => state.loading.loading)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log Out"
          icon={({ focused, color, size }) => (
            <Ionicons name="log-out-sharp" size={25} color={color} />
          )}
          onPress={async () => {
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
          }}
        />
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
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerType: 'back',
          drawerActiveBackgroundColor: THEME.MAIN_COLOR,
          drawerActiveTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#fff',
          },
          ...headerCommonOptions
        }}>

        {template}

      </Drawer.Navigator>
    </NavigationContainer >
  );
}

export default AppNavigation;