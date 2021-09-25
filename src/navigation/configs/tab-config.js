import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import ReportsNavigator from '../navigators/ReportsNavigator';
import StackNavigator from '../navigators/StackNavigator';

export const tabConfig = [
  {
    name: "Main",
    component: StackNavigator,
    options: (navigation, route) => ({
      tabBarIcon: (info) => <Ionicons name="apps-sharp" size={25} color={info.color} />,
      tabBarLabel: 'Apps',
    })
  },
  {
    name: "Reports",
    component: ReportsNavigator,
    options: (navigation, route) => ({
      title: 'Reports',
      tabBarIcon: (info) => <Ionicons name="document-text" size={25} color={info.color} onPress={() => {
        //navigation.navigate('Main')
      }}/>
    })
  },

 
]