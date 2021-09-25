import React from 'react'
import ReportsScreen from '../../screens/ReportsScreen'
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AppHeaderIcon from '../../components/ui/AppHeaderIcon';
import AppScreen from '../../screens/AppScreen';

export const reportsConfig = [
  {
    name: "Reports",
    component: ReportsScreen,
    options: (navigation, route) => ({
      title: 'Reports',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="menu" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
        </HeaderButtons>
      )
    })
  },
  {
    name: "Apps",
    component: AppScreen,
    options: (navigation, route) => ({
      title: 'Apps',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="menu" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
        </HeaderButtons>
      )
    })
  },
]