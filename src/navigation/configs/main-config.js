import React from 'react';
import TabNavigator from '../navigators/TabNavigator';
import LoginScreen from '../../screens/LoginScreen';
import {Ionicons} from '@expo/vector-icons';
export const mainConfig = [
  {
    name: "Apps",
    component: TabNavigator,
    options: (navigation, route) => ({
      drawerIcon: (info) => (
        <Ionicons name="home" size={25} color={info.color} onPress={() => {
          //navigation.navigate('Main')
        }}/>
      ),
      drawerLabel: 'Home',
      headerShown: false
    })
  },
  {
    name: "Login",
    component: () => <LoginScreen />,
    options: (navigation, route) => ({
      drawerLabel: 'Log Out',
      drawerIcon: (info) => (
        <Ionicons name="log-out-sharp" size={25} color={info.color} onPress={() => {
      }}/>
      ),
      title: 'Login',
      headerShown: false,
    })
  },
]