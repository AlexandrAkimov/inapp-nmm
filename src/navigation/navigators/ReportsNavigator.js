import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerCommonOptions } from '../configs/header-config';
import { reportsConfig } from '../configs/reports-config';

const Stack = createNativeStackNavigator();

export default function ReportsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={headerCommonOptions}
      >
        {reportsConfig.map((screen, index) => {
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