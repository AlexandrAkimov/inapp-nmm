import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AppHeaderIcon from '../../components/ui/AppHeaderIcon';
import { headerCommonOptions } from '../configs/header-config';
import { stackConfig } from '../configs/stack-config';
import TabNavigator from './TabNavigator';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Apps"
          component={TabNavigator}
          options={(navigation, route) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={(navigation, route) => ({
            headerShown: false
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}