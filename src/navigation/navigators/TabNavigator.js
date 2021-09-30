import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { tabConfig } from '../configs/tab-config';
import { THEME } from '../../theme';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={colors.notification}
    >
      {tabConfig.map((screen, index) => {
        return (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={() => screen.options()}
          />
        )
      })}
    </Tab.Navigator>
  );
}