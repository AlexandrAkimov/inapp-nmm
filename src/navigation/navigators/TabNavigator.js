import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { tabConfig } from '../configs/tab-config';
import { THEME } from '../../theme';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: THEME.MAIN_COLOR, paddingVertical: 5 }}
      activeColor="#fff"
      shifting={true}
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