import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerCommonOptions } from '../configs/header-config';
import { stackConfig } from '../configs/stack-config';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={headerCommonOptions}
      >
        {stackConfig.map((screen, index) => {
          return (
            <Stack.Screen
              key={index}
              name={screen.name}
              component={screen.component}
              options={({ navigation, route }) => screen.options(navigation, route)}
            />
          )
        })}
      </Stack.Group>
    </Stack.Navigator>
  );
}